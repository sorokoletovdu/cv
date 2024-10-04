// Download the CV as PDF
document.getElementById("download-btn").addEventListener("click", function() {
    // Capture the CV section as an image
    html2canvas(document.querySelector("#cv")).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();

        // Set PDF dimensions based on A4 size
        const imgWidth = 210; // A4 page width in mm
        const pageHeight = 297; // A4 page height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add the image to the first page of the PDF
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if content overflows
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the generated PDF
        pdf.save("Resume_Dmitrii_Sorokoletov.pdf");
    });
});
