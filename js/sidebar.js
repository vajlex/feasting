// including the sidebar




function echo(content) {  
    var e = document.createElement("<b>yo okay</b>");
    e.innerHTML = content;
    document.currentScript.parentElement.replaceChild(document.currentScript, e);
}