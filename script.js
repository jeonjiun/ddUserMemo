function getMemo(result, id) {
    if(result[id] == null)
        return null;

    if(result[id].memo != null)
        return result[id].memo;
    
    return result[id];
}

function makeMemo(result, id, memotext)
{
    fdate = Date.now()
    mdate = Date.now()

    arr = {};
    arr[id] = {
        memo: memotext,
        first_date:Date.now(),
        mod_date:Date.now()
    };

    if(result[id] != null)
    {
        if(result[id].first_date != null)
            arr[id].first_date = result[id].first_date;
    }

    return arr;
}

function updatePage() {
    document.body.style.backgroundColor = 'red';

    dog_counter = 0

    els = document.querySelectorAll(".author > a");

    dog_modifier = (id2) => {
        chrome.storage.sync.get(id2).then((result) => {
            prevMemo = getMemo(result,id2);
            d = new Date(result[id2].first_date);
            md = new Date(result[id2].mod_date);

            let memowr = prompt('개붕이 메모\n' + id2 + '\nAdded: '+ d+ '\nModified: ' + md, prevMemo);
            if (memowr != null) 
            {
                m = makeMemo(result,id2,memowr);
                chrome.storage.sync.set(m);
            }
        });
    };

    addUserInfo = (e, id) => {

        chrome.storage.sync.get(id).then((result) => {
            dog_counter = dog_counter + 1;

            memo = getMemo(result,id);

            if (memo != null && memo != "") {

                inner = "<a class='dog_" + id + " dog_cnt_" + dog_counter + "'>[*]</a>";
                //mod = "<a class='dog_mod_"+dog_counter + "'>[#]</a>";

                e.insertAdjacentHTML("afterbegin", inner);
                console.log(memo);
                document.querySelector(".dog_cnt_" + dog_counter)
                    .addEventListener("click", () => { dog_modifier(id) });




            } else {
                inner = "<a class='dog_" + id + " dog_cnt_" + dog_counter + "'>[_]</a>";
                e.insertAdjacentHTML("afterbegin", inner);

                document.querySelector(".dog_cnt_" + dog_counter)
                    .addEventListener("click", () => { dog_modifier(id) });
            }
        });
    }

    els.forEach((item) => {
        item.classList.forEach((s) => {
            if (s.startsWith('member_')) {
                addUserInfo(item, s);

                //item.addEventListener("click",()=>{alert(s)});
            }
        });
    });

    comments = document.querySelectorAll(".comment-bar > div > h6 > a");
    comments.forEach((item) => {
        item.classList.forEach((s) => {
            if (s.startsWith('member_')) {
                addUserInfo(item, s);
            }
        });
    });


}


updatePage();


//   chrome.action.onClicked.addListener((tab) => {
//     if(!tab.url.includes("chrome://")) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: reddenPage
//       });
//     }
//   });