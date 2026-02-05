import { Button } from "@material-tailwind/react";
function DonwloadDocumentLink({ fileContent, fileName }) {

  const downloadFile = () => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:application/octet-stream;base64,${fileContent}`);
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <Button onClick={downloadFile} size="sm" className="flex items-center gap-3" color="blue-gray" variant="text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
        {fileName}
      </Button>
    </div>
  );
}

export default DonwloadDocumentLink;
