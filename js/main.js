// section#text pre的宽高需要比section#text小2vw或vh，因为里面的盒子有padding & margin，总共占了4。
let openupIntroduction = `  
    /*
        你好，我是陈亦涛。因为普通的简历太无聊了，
        所以我给简历加了点特效。
        这个界面现在比较简陋，让我们来做一些美化的工作吧。
        首先给样式的变化加上动画效果。
    */

   *{
        transition: all 1s ease;
    }

    /*来点背景颜色*/
    section#text{
        background: #FDF6E3;
    }
    body{
        background: rgb(238, 238, 238);
    }
    
    
    /* 再调整一下字体的排版，让它看起来更舒服。*/
    
    
    section#text pre{
        font-family: 'Consolas', '等线';
        line-height: 20px;
        padding: 1vh 1vw;
        margin: 1vh 1vw;
    }

    /*为溢出的代码准备一个滚动条*/
    section#text{
        overflow: auto;
    }

    section#text{
        width: 100vw;
        height: 96vh;
    }

    section#text pre{
        width: 96vw;
    }
    
    /* 再给代码加一点高亮~*/

    /* 还要给边框加一个呼吸效果*/
    section#text pre{
        animation: breathe 1s ease 0s infinite alternate;
    }

    /*边框加上圆角也很好看哦*/
    section#text pre{
        border-radius: 20px;
    }
    section#text {
        border-radius: 40px;
    }

    /*
    * 好了，现在界面变得令人十分舒服，接下来弄一点好玩的东西，
    * 让我们为好玩的东西腾一点空间吧。
    */
    section#text pre{
        width: 40vw;
    }
    section#text{
        width: 44vw;
        height: 100vh;
    }

`;

let drawIntroduction = `
    /*来用CSS画一些有趣的东西。*/
    section#text{
        height: 70vh;
    }
    section#pixels{
        box-shadow: -2px 4px 30px 0px rgba(0,0,0,0.5);
        position: absolute;
        left: 1vw;
        top: 70vh;
        width: 38vw;
        height: 27vh;
        margin: 1vh 1vw;
        background-color: #E7E7E7;
        border-radius: 10px;
    }
    `;
    
    let resumeIntroduction = `
    /*这样三只宠物小精灵就画好了，初代的御三家是不是很可爱呀！*/
    /*好了，不玩了。接下来介绍一下自己，我需要在右边准备一张白纸。*/
    section#resume_wrapper{
        position: absolute;
        background: white;
        right: 0;
        top: 0;
        width: 54vw;
        height: 98vh;
        box-shadow: -2px 4px 30px 0px rgba(0,0,0,0.5);
    }

    /*白纸还不够漂亮，让我们再优化一下吧。*/
    section#resume_wrapper{
        border-radius: 20px;
        overflow: auto;
        margin: 1vh 1vw;
        padding: 1vh 1vw;

    }
    section#resume_wrapper #resume{
        width: 52vw;
    }

    /*这样白纸就准备好了，开始写简历吧！*/
`;

let resumeContent = `
    # 简介
    陈亦涛 23岁 cyitao@foxmail.com 浙江工业大学

    # 技能
    - HTML CSS JS Dom编程 
    - HTTP Ajax JSONP Cookie Session 
    - 了解常用排序算法与数据结构
    - jQuery Vue 

    # 项目
    - [canvas画板](https://inkymountain.github.io/Drawing-board/)
    - [网址导航](https://inkymountain.github.io/navigation/)
    - [动态简历](${window.location.href})
    - [网易云音乐]() 待完成
`;

let markedIntroduction = `
    /*然后把markdown语法，改成了对HR友好的格式。*/

    /*接下来让我们把标题放大点*/
    h1{
        font-size: 30px;
        font-weight: bold;
    }

    /*然后弄一个好看的小圆点*/
    li::before{
        content: '';
        background: black;
        display: inline-block;
        width: 6px;
        height: 6px;
    }

    /*再让间距变得合理！*/
    li::before{
        border-radius: 50%;
        margin: 0 10px;
    }

    /*这样我的简历就完成了，对我感兴趣的话请联系我哦！！*/
`;

function displayText(callback, source, prefix = '') {
    let index = 0;
    let interval = setInterval(() => {
        index++;
        let textFragment = source.substring(0, index);
        preview.innerHTML = Prism.highlight(prefix + textFragment, Prism.languages.css, 'css');
        styleTag.innerText = prefix + textFragment;
        if (source.charAt(index) === '~') {
            prismCss.href = 'css/prism.css';
        }
        text.scrollTop = text.scrollHeight;
        if (index >= source.length) {
            window.clearInterval(interval);
            callback();
        }
    }, 60);
}
function writeToResume(callback, source) {
    let index = 0;
    let interval = setInterval(() => {
        index++;
        let textFragment = source.substring(0, index);
        resume.innerHTML = textFragment;
        resume_wrapper.scrollTop = resume_wrapper.scrollHeight;
        if (index >= source.length) {
            window.clearInterval(interval);
            callback();
        }
    }, 10);
}

displayText(  //第一层
    () => {

    displayText(() => {  //第二层

        pixels.style.opacity = '1';
        displayText(() => {  //第三层
            
            writeToResume(()=>{  //第四层，写到简历中的文字。
                let mark1 = marked(resume.textContent);
                resume.innerHTML = marked(resume.textContent);
                resume.innerHTML = marked(resume.textContent);
                displayText(()=>{
                    let as = document.links;
                    for (let a of as){
                        a.target = "_blank";
                    }
                }, markedIntroduction,   //第五层，写到介绍中的文字。
                openupIntroduction + drawIntroduction + resumeIntroduction);
            
            }, resumeContent);
        
        }, resumeIntroduction, openupIntroduction + drawIntroduction);

    }, drawIntroduction, openupIntroduction);

}, 
openupIntroduction, '');