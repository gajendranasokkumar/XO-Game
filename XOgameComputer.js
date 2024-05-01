
let ccOmark = `<div class="gameOMainLogo"></div>`;
let ccXmark = `<div class="gameXMainLogo"><div class="XsLeftHand">
</div><div class="XsRightHand"></div></div>`;

let cchoverOmark = `<div class="gameOMainLogo hoverOpacity"></div>`;
let cchoverXmark = `<div class="gameXMainLogo hoverOpacity"><div class="XsLeftHand">
</div><div class="XsRightHand"></div></div>`;

let cctopPlayersTurn = document.getElementById('ccplayer_Turn');
cctopPlayersTurn.innerHTML = '<i class="fa-solid fa-xmark playerTopX"></i>';

let ccmark = ccXmark;
let cchoverMark = cchoverXmark;
let ccplayer = 'x';

let ccXmarkedBoxex = [];
let ccOmarkedBoxex = [];
let ccalreadyCheckBboxNumber = [];

// let posibilities = {
//     'box1': [2,3,4,7,5,9],
//     'box2': [1,3,5,8],
//     'box3': [1,2,6,9,5,7],
//     'box4': [1,7,5,6],
//     'box5': [1,2,3,4,6,7,8,9,],
//     'box6': [4,5,3,9],
//     'box7': [1,4,5,3,8,9],
//     'box8': [2,7,5,9],
//     'box9': [1,5,3,6,7,8],
// };

let ccthreeBoxSetCompletion = {
    'item1' : [[1,2,3],[1,4,7],[1,5,9]],
    'item2' : [[1,2,3],[2,5,8]],
    'item3' : [[1,2,3],[3,5,7],[3,6,9]],
    'item4' : [[1,4,7],[4,5,6]],
    'item5' : [[1,5,9],[3,5,7],[2,5,8],[4,5,6]],
    'item6' : [[3,6,9],[4,5,6]],
    'item7' : [[1,4,7],[7,8,9],[3,5,7]],
    'item8' : [[2,5,8],[7,8,9]],
    'item9' : [[1,5,9],[7,8,9],[3,6,9]],
};

let ccXwinningCount = 0;
let ccOwinningCount = 0;
let ccdrawMatchCount = 0;

let ccxCountOfWinning = document.getElementById('ccxCountOfWinning');
let ccdrawCountOfWinning = document.getElementById('ccdrawCountOfWinning');
let ccoCountOfWinning = document.getElementById('ccoCountOfWinning');

let ccselectedBoxArray = [];


let ccchangeTheColorOnWinning = (setNo , player) =>
{
    if(player == 'x')
    {
        for(let box of setNo)
        {
            let changingColorBox = document.getElementById(`ccgameBox${box}`);
            changingColorBox.style.backgroundColor = "#31C3BE";
            let outContainerOfX = changingColorBox.children[0];
            outContainerOfX.children[0].style.backgroundColor = "#1F3540";
            outContainerOfX.children[1].style.backgroundColor = "#1F3540";
        }
    }
    else if(player == 'o')
    {
        for (let box of setNo)
        {
            let changingColorBox = document.getElementById(`ccgameBox${box}`);
            changingColorBox.style.backgroundColor = "#F2B237";
            let outContainer = changingColorBox.children[0];
            outContainer.style.border = "13px solid #1F3540";
            outContainer.style.backgroundColor = "#F2B237";
        }
    }
};

let cclocalXWinning;
let cclocalOWinning;
let cclocalDrawWinning;

// let ccupdateCountOnReoad = () =>
// {
//     ccXwinningCount = JSON.parse(localStorage.getItem("ccxCount"));
//     ccxCountOfWinning.textContent = JSON.parse(localStorage.getItem("ccxCount"));
//     ccOwinningCount = JSON.parse(localStorage.getItem("ccoCount"));
//     ccoCountOfWinning.textContent = JSON.parse(localStorage.getItem("ccoCount"));
//     ccdrawMatchCount = JSON.parse(localStorage.getItem("ccdrawCount"));
//     ccdrawCountOfWinning.textContent = JSON.parse(localStorage.getItem("ccdrawCount"));
// };

// ccupdateCountOnReoad();

let ccupdateCountOfWinning = (count , player) =>
{
    if(player == 'x')
    {
        cclocalXWinning = localStorage.setItem("ccxCount" , count);
        ccxCountOfWinning.textContent = count;
    }
    else if(player == 'o')
    {
        cclocalOWinning = localStorage.setItem("ccoCount" , count);
        ccoCountOfWinning.textContent = count;
    }
    else
    {
        cclocalDrawWinning = localStorage.setItem("ccdrawCount" , count);
        ccdrawCountOfWinning.textContent = count;
    }
};



let ccshowWinner = (player) =>
{
    winnerResultContainer.classList.remove('hideAndDisplay');
    if(player == 'x')
    {
        winnerLogoPlace.innerHTML = `<div class="gameXMainLogo">
            <div class="XsLeftHand"></div>
            <div class="XsRightHand"></div>
            </div>`;
        whoWonTheGame.textContent = 'YOU';
    }
    else if(player == 'o')
    {
        winnerLogoPlace.innerHTML = `<div class="gameOMainLogo"></div>`;
        whoWonTheGame.textContent = 'Augus';
    }
    else if(player == 'draw')
    {
        winnerLogoPlace.innerHTML = `<img class="logoIMage" src="https://res.cloudinary.com/dkbwdkthr/image/upload/v1695493451/Screenshot_2023-09-23_235017_rjusju.png" />`;
        whoWonTheGame.textContent = '~ NO ONE ~';
    }
};


let ccwinnFlag = true;

let cccheckForWinning = (boxNo , player) =>
{
    ccwinnFlag = true;
    if(player == 'x')
    {
        ccXmarkedBoxex.push(boxNo);
        for(let oneSet of (ccthreeBoxSetCompletion[`item${boxNo}`]))
        {
            let setOfPossibleSets = new Set(ccXmarkedBoxex);
            let isPresent = oneSet.every(num => setOfPossibleSets.has(num));
            if(isPresent)
            {
                ccXwinningCount += 1;
                ccupdateCountOfWinning(ccXwinningCount,'x');
                setTimeout(ccchangeTheColorOnWinning.bind(this,oneSet , 'x'),0.1);
                setTimeout(ccshowWinner('x'),500);
                ccwinnFlag = false;
            }
        }
    }
    else if(player == 'o')
    {
        // ccOmarkedBoxex.push(boxNo);
        for(let oneSet of (ccthreeBoxSetCompletion[`item${boxNo}`]))
        {
            let setOfPossibleSets = new Set(ccOmarkedBoxex);
            let isPresent = oneSet.every(num => setOfPossibleSets.has(num));
            if(isPresent)
            {
                ccOwinningCount += 1;
                ccupdateCountOfWinning(ccOwinningCount,'o');
                setTimeout(ccchangeTheColorOnWinning.bind(this,oneSet , 'o'),0.1);
                setTimeout(ccshowWinner('o'),500);
                ccwinnFlag = false;
            }
        }
    }
    if(ccselectedBoxArray.length == 9 && ccwinnFlag)
    {
        ccdrawMatchCount += 1;
        ccwinnFlag = false;
        ccupdateCountOfWinning(ccdrawMatchCount,'draw');
        setTimeout(ccshowWinner('draw'),500);
    }
};

let posibilities = {
    'box1': [2,3,4,7,5,9],
    'box2': [1,3,5,8],
    'box3': [1,2,6,9,5,7],
    'box4': [1,7,5,6],
    'box5': [1,2,3,4,6,7,8,9,],
    'box6': [4,5,3,9],
    'box7': [1,4,5,3,8,9],
    'box8': [2,7,5,9],
    'box9': [1,5,3,6,7,8],
};

let ccRandomComputerSet = {
    // 'box12' : 3,
    // 'box15' : 9,
    // 'box14' : 7,
    // 'box21' : 3,
    // 'box23' : 1,
    // 'box25' : 8,
    // 'box31' : 2,
    // 'box32' : 1,
    // 'box36' : 9,
    // 'box35' : 7,
    // 'box41' : 7,
    // 'box47' : 1,
    // 'box45' : 6,
    // 'box51' : 9,
    // 'box52' : 8,
    // 'box53' : 7,
    // 'box54' : 6,
    // 'box56' : 4,
    // 'box57' : 3,
    // 'box58' : 2,
    // 'box59' : 1,
    // 'box63' : 9,
    // 'box65' : 4,
    // 'box69' : 3,
    // 'box74' : 1,
    // 'box75' : 3,
    // 'box78' : 9,
    // 'box85' : 2,
    // 'box87' : 9,
    // 'box89' : 7,
    // 'box95' : 1,
    // 'box98' : 7,
    // 'box96' : 3,
    // 'box' : ,
    
    'box12' : 3,
    'box15' : 9,
    'box14' : 7,
    'box19' : 5,
    'box21' : 3,
    'box23' : 1,
    'box25' : 8,
    'box28' : 5,
    'box31' : 2,
    'box32' : 1,
    'box36' : 9,
    'box35' : 7,
    'box37' : 5,
    'box41' : 7,
    'box47' : 1,
    'box45' : 6,
    'box46' : 5,
    'box51' : 9,
    'box52' : 8,
    'box53' : 7,
    'box54' : 6,
    'box56' : 4,
    'box57' : 3,
    'box58' : 2,
    'box59' : 1,
    'box63' : 9,
    'box64' : 5,
    'box65' : 4,
    'box69' : 3,
    'box74' : 1,
    'box73' : 5,
    'box75' : 3,
    'box78' : 9,
    'box79' : 8,
    'box82' : 5,
    'box85' : 2,
    'box87' : 9,
    'box89' : 7,
    'box91' : 5,
    'box95' : 1,
    'box98' : 7,
    'box97' : 8,
    'box96' : 3,
};

remainingBoxesArray = [1,2,3,4,5,6,7,8,9];

let generateRandomBox = () =>
{
    let number = remainingBoxesArray[Math.floor(Math.random() * remainingBoxesArray.length)];
    return number;
};

let oneSetBoxNo = [];

let cccomputersChoiseToPutMark = () =>
{
    let number = 0;
    if(oneSetBoxNo.length==2)
    {
        number = ccRandomComputerSet[`box${oneSetBoxNo[0]}${oneSetBoxNo[1]}`];
        oneSetBoxNo.splice(0,1);
        if((remainingBoxesArray.includes(number)))
        {
            number = number;
        }
        else
        {
            number = generateRandomBox();
        }
    }
    else
    {
        number = generateRandomBox();
    }
    let index = remainingBoxesArray.indexOf(number);
    remainingBoxesArray.splice(index , 1);
    ccOmarkedBoxex.push(number);
    ccselectedBoxArray.push(number);
    let boxx = document.getElementById(`ccgameBox${number}`);
    boxx.innerHTML = ccOmark;
    let boxx2 = document.getElementById(`ccIIgameBox${number}`);
    boxx2.setAttribute("onmouseover", "");
    boxx2.setAttribute("onmouseleave","");
    cccheckForWinning(number, 'o');
    ccalreadyCheckBboxNumber.push(number);
};

let ccputMarkInsideBox = (boxNo) => 
{   
    if(ccalreadyCheckBboxNumber.includes(boxNo))
    {
        alert("Invalid selection!!");
        return 0;
    }
    oneSetBoxNo.push(boxNo);
    let index = remainingBoxesArray.indexOf(boxNo);
    remainingBoxesArray.splice(index , 1);
    ccselectedBoxArray.push(boxNo);
    cccheckForWinning(boxNo, 'x');
    let boxx = document.getElementById(`ccgameBox${boxNo}`);
    let boxx2 = document.getElementById(`ccIIgameBox${boxNo}`);
    boxx2.setAttribute('onmouseleave', '');
    boxx2.setAttribute('onmouseover', '');
    boxx.innerHTML = ccXmark;
    ccalreadyCheckBboxNumber.push(boxNo);
    ccOmarkedBoxex = [...new Set(ccOmarkedBoxex)];
    if(ccOmarkedBoxex.length < 4)
    {
        cccomputersChoiseToPutMark();
    }
};

let ccaddHoverEffectInBox = (boxNo) =>
{
    document.getElementById(`ccgameBox${boxNo}`).innerHTML = cchoverMark;
};

let ccremoveaddHoverEffectInBox = (boxNo) =>
{
    document.getElementById(`ccgameBox${boxNo}`).innerHTML = "";
};

for(let i = 1;i<=9;i++){
  document.getElementById(`ccIIgameBox${i}`).addEventListener("click", ccputMarkInsideBox.bind(this, i));
}

let computerGameContainer = document.getElementById('computerGameContainer');

let enableGameContainerFunction = () =>
{
    enableComputerMode = true;
    computerGameContainer.classList.toggle('hideAndDisplay');
    playWithContainer.classList.toggle('hideAndDisplay');
};




    // 'box12' : 3,
    // 'box15' : 9,
    // 'box14' : 7,
    // 'box19' : 5,
    // 'box21' : 3,
    // 'box23' : 1,
    // 'box25' : 8,
    // 'box28' : 5,
    // 'box31' : 2,
    // 'box32' : 1,
    // 'box36' : 9,
    // 'box35' : 7,
    // 'box37' : 5,
    // 'box41' : 7,
    // 'box47' : 1,
    // 'box45' : 6,
    // 'box46' : 5,
    // 'box51' : 9,
    // 'box52' : 8,
    // 'box53' : 7,
    // 'box54' : 6,
    // 'box56' : 4,
    // 'box57' : 3,
    // 'box58' : 2,
    // 'box59' : 1,
    // 'box63' : 9,
    // 'box64' : 5,
    // 'box65' : 4,
    // 'box69' : 3,
    // 'box74' : 1,
    // 'box73' : 5,
    // 'box75' : 3,
    // 'box78' : 9,
    // 'box82' : 5,
    // 'box85' : 2,
    // 'box87' : 9,
    // 'box89' : 7,
    // 'box91' : 5,
    // 'box95' : 1,
    // 'box98' : 7,
    // 'box96' : 3,