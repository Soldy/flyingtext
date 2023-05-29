const $lorem = new loremBase();

window.onload = ()=>{(new FlyingTextClass(
    document.getElementsByClassName('holder')[0],
    $lorem.paragraph()
)).run();}
