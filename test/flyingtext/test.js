const $lorem = new loremBase();

window.onload = ()=>{
    const flyingText = new FlyingTextClass(
        document.getElementsByClassName('holder')[0],
        $lorem.paragraph()
    );
    flyingText.run();
    window.onresize = flyingText.resize;
};
