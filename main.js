let css = `
/* 
面试官您好，我是XXX
只用文字作做我介绍太单调了
我就用代码来介绍吧
首先准备一些样式
*/

* {
    transition: all 0.5s;
}

body {
    background: #eee;
    font-size: 16px;
}

#editor {
    border: solid black;
    height: 100vh;
    overflow: hidden;
}

/* 我需要一点代码高亮 */

.hljs-comment{
    color: #008000;
}

.hljs-selector-tag{
    color: #00f;
}

.hljs-attribute {
    color: #a31515;
}

/* 加点 3D 效果 */

#editor {
    transform: rotate(360deg)
}

/* 
不玩了，我来介绍一下我自己吧
我需要一张白纸 
*/
`;

let css2 = `
#editor {
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}

#paperWrapper {
    background: white;
    position: fixed;
    right: 0;
    height: 100%;
    width: 50%;
    border: black solid;
    padding: 10px;
    overflow: auto;
}

/* 现在我就可以在白纸上写字了，请看右边 */

`;

let md = `
# 自我介绍

我叫 XXX

1995 年 7 月出生

XXX 学校毕业

自学前端半年

希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播

2. XXX 简历

3. XXX 画板

# 联系方式

- QQ xxxxxxxx

- Email xxxxxxxx

- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx

- Email xxxxxxxx

- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx

- Email xxxxxxxx

- 手机 xxxxxxx
`

let css3 = `
/* 
接下来用一个优秀的库 marked.js
把 Markdown 变成 HTML
*/
`
let css4 = `
/*
这就是我的会动的简历
谢谢观看
*/
`

function writeCSS(previousContents,contents,callback){
    let n = 0;
    let writing = setInterval(()=>{
        n += 1;
        code.innerHTML = hljs.highlight('css', previousContents + contents.slice(0,n), true).value;
        style.innerHTML = previousContents + contents.slice(0,n);
        editor.scrollTop = editor.scrollHeight;
        if(n > contents.length){
            window.clearInterval(writing);
            callback();
        }
    },50)
}

function createPaper(callback){
    let paperWrapper = document.createElement('div');
    paperWrapper.id = 'paperWrapper';
    document.body.append(paperWrapper);
    let paper = document.createElement('pre');
    paper.id = 'paper';
    paperWrapper.append(paper);
    callback();
}

function writeMarkdown(contents,callback){
    let n = 0;
    let writing = setInterval(()=>{
        n += 1;
        paper.innerHTML = hljs.highlight('markdown', contents.slice(0,n), true).value;
        paperWrapper.scrollTop = paperWrapper.scrollHeight;
        if(n > contents.length){
            window.clearInterval(writing);
            callback();
        }
    },50)
}

function MD2HTML(callback){
    let div = document.createElement('div');
    div.innerHTML = marked(md);
    div.className = 'markdown-body';
    paper.replaceWith(div);
    paperWrapper.scrollTop = 0;
    callback();
}


writeCSS('',css,()=>{
    createPaper(()=>{
        writeCSS(css,css2,()=>{
            writeMarkdown(md,()=>{
                writeCSS(css+css2,css3,()=>{
                    MD2HTML(()=>{
                        writeCSS(css+css2+css3,css4,()=>{})
                    })
                })
            })
        })
    })
});

