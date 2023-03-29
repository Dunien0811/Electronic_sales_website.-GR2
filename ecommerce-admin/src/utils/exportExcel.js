import * as Config from '../constants/Config';
  
  export const exportExcel = (resource) => {
    console.log('resource', resource);
    
    const request = new XMLHttpRequest();
    request.open(
      'GET',
      `${Config.API_URL}/${resource}/exportExcel?`
    );
    request.setRequestHeader('Authorization', localStorage.getItem('_auth'));
    request.responseType = 'arraybuffer';
    request.onload = () => {
      if (request.status === 200) {
        // Try to find out the filename from the content disposition filename value
        const disposition = request.getResponseHeader('Content-Disposition');
        const matches = disposition.substring(
          disposition.indexOf('filename=') + 9,
          disposition.length
        );
        const filename = matches != null && matches !== '' ? matches : resource.xlsx;
        // The actual download
        const blob = new Blob([request.response], {
          type: request.getResponseHeader('content-type'),
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    request.send();
  };

  //chua chay