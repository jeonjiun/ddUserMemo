
function exportData()
{
    console.log("==== result  ==== ");
    chrome.storage.sync.get(null).then(result =>{
        data = '';
        for( a in result)
        {

            m = result[a].memo;
            fd = result[a].first_date;
            md = result[a].mod_date;

            if(m == null)
                m = result[a];
            if(fd == null)
                fd = Date.now();
            if(md == null)
                md = Date.now();

            log = a + '\t' + m + '\t' + fd + '\t' + md+ '\n';
            data += log;

            // arr = {};
            // arr[a]={
            //     memo: m,
            //     first_date:fd,
            //     mod_date:md
            // };

            // chrome.storage.sync.set(arr);
        }
        link = document.createElement('a');
        link.download = 'export.txt';
        link.href = 'data:text/csv;name=doc.txt;charset=utf-8,'+data;
        link.click();
        //alert(result);
    });
}

btn = document.querySelector("#export_btn");

btn.addEventListener("click",exportData);