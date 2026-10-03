// ─── PDF Text Extractor Utility ─────────────────────────────────────────────
// Menggunakan PDF.js via CDN agar tidak membebani bundler Vite dan zero worker-config issue.

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
const PDFJS_WORKER_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

let loadPdfJsPromise = null

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib)
  if (loadPdfJsPromise) return loadPdfJsPromise

  loadPdfJsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = PDFJS_CDN
    script.async = true
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_CDN
        resolve(window.pdfjsLib)
      } else {
        reject(new Error('Gagal memuat pustaka PDF.js'))
      }
    }
    script.onerror = () => reject(new Error('Gagal mengunduh PDF.js dari CDN'))
    document.head.appendChild(script)
  })

  return loadPdfJsPromise
}

/**
 * Ekstrak teks dari file PDF
 * @param {File} file
 * @param {Function} onProgress - Callback (currentPage, totalPages)
 * @returns {Promise<{ text: string, numPages: number, fileName: string }>}
 */
export async function extractTextFromPdf(file, onProgress = null) {
  const pdfjs = await loadPdfJs()
  const arrayBuffer = await file.arrayBuffer()
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
  const pdfDoc = await loadingTask.promise
  const numPages = pdfDoc.numPages

  const textPages = []

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (onProgress) onProgress(pageNum, numPages)
    const page = await pdfDoc.getPage(pageNum)
    const textContent = await page.getTextContent()

    // Gabungkan item teks dengan memperhatikan baris
    let lastY = null
    let pageText = ''
    for (const item of textContent.items) {
      if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
        pageText += '\n'
      } else if (pageText.length > 0 && !pageText.endsWith(' ') && !pageText.endsWith('\n')) {
        pageText += ' '
      }
      pageText += item.str
      lastY = item.transform[5]
    }

    const cleaned = pageText.trim()
    if (cleaned) {
      textPages.push(`--- [Halaman ${pageNum}] ---\n${cleaned}`)
    }
  }

  const fullText = textPages.join('\n\n')

  return {
    text: fullText,
    numPages,
    fileName: file.name,
    charCount: fullText.length,
  }
}
