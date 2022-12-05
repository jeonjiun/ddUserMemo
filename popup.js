
function reddenPage() {
document.body.style.backgroundColor = 'red';

// s = 'member_153511888'
// arr = {};
// arr[s] = "바보";

// chrome.storage.local.set(arr);

dog_counter = 0

els = document.querySelectorAll(".author > a");

//popup = document.querySelector("#popup_menu_area > ul");
//popup.insertAdjacentHTML("beforeend","<li>메모메모</li>");
dog_modifier = (id2) => {
    chrome.storage.sync.get(id2).then((result)=>{
        prevMemo=result[id2];

        let memowr = prompt('개붕이 메모\n'+id2+': ',prevMemo);
        if(memowr != null)
        {
            arr = {};
            arr[id2] = memowr;
            console.log(arr);
            chrome.storage.sync.set(arr);
        }
    });
};

addUserInfo = (e, id) =>
    {

        chrome.storage.sync.get(id).then((result)=>{
            dog_counter = dog_counter + 1;

            memo=result[id];

            if(memo != null && memo != "" ){

                inner="<a class='dog_"+id+ " dog_cnt_"+ dog_counter + "'>[*]</a>";
                //mod = "<a class='dog_mod_"+dog_counter + "'>[#]</a>";

                e.insertAdjacentHTML("afterbegin",inner);
                console.log(memo);
                document.querySelector(".dog_cnt_"+dog_counter)
                    .addEventListener("click",()=>{dog_modifier(id)});




            } else {
                inner="<a class='dog_"+id+ " dog_cnt_"+ dog_counter + "'>[_]</a>";
                e.insertAdjacentHTML("afterbegin",inner);

                document.querySelector(".dog_cnt_"+dog_counter)
                    .addEventListener("click",()=>{dog_modifier(id)});
            }
        });
    }

els.forEach((item) =>{
    item.classList.forEach((s)=>{
        if(s.startsWith('member_')){
            addUserInfo(item,s);

            //item.addEventListener("click",()=>{alert(s)});
        }
    });
});

comments = document.querySelectorAll(".comment-bar > div > h6 > a");
comments.forEach((item) =>{    
    item.classList.forEach((s)=>{
        if(s.startsWith('member_')){
            addUserInfo(item,s);
        }
    });
});


}
  

reddenPage();


//   chrome.action.onClicked.addListener((tab) => {
//     if(!tab.url.includes("chrome://")) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: reddenPage
//       });
//     }
//   });