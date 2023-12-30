import { getData } from './data'
import jsPDF from 'jspdf'

// https://copyprogramming.com/howto/print-webpage-to-pdf-using-javascript-code-example?utm_content=cmp-true

// This function works badly and needs to be change

export const exportToPDF = async () => {
    const { name } = await getData('Heading')
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
    })

    const cv = document.getElementById('CV')

    if (!cv?.innerHTML) {
        console.log('No CV element found')
        return
    }

    pdf.html(cv, {
        margin: [0, 0, 0, 0],
        x: 0,
        y: 0,
        width: 210,
        callback: function (pdf) {
            pdf.save(`${name.split(' ').join('')}_CV.pdf`)
        }
    })
}

export const printCV = () => setTimeout(window.print, 3000)