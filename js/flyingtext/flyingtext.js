class FlyingTextClass{
    resize(){
        this.#clean();
        this.#sizeSetup();
        this.#canvasInit();
    };
    async run(){
        while(true){
            await this.#wait();
            this.#round_start = Date.now();
            this.#round();
       }
    };
    #interval = 20;
    #speed = 2;
    #position = 0;
    #holder = false;
    #width = 400;
    #height = 50;
    #original_size = 0;
    #full_size = 0;
    #text = '';
    #details;
    #canvas;
    #ctx;
    #break_point = 1000;
    #round_start = Date.now();
    constructor(
        holder_,
        text_
    ){
        if(!holder_ instanceof HTMLElement)
            throw Error('We are doomed! This element is not a doom element.');
        if(typeof text_ !== 'string')
            throw TypeError(
              'This text_ is not a string. Looks like a '+
              (typeof text_)+
              ' to me.'
            );
        this.#holder = holder_;
        this.#sizeSetup();
        this.#positionSetup();
        this.#canvasInit();
        this.#textSetup();
        this.#textMesure(text_);
        this.resize = this.resize.bind(this);
    };
    #sizeSetup(){
        this.#details = this.#holder.getBoundingClientRect();
        this.#width = parseInt(this.#details.width);
    };
    #positionSetup(){
        this.#position = parseInt(this.#details.width);
    };
    #canvasInit(){
        this.#canvas = document.createElement('canvas');
        this.#ctx = this.#canvas.getContext('2d');
        this.#canvas.setAttribute('width',  this.#width);
        this.#holder.appendChild(this.#canvas);
    };
    #textSetup(){
        this.#ctx.font = "30px Arial";
    };
    #textMesure(text_){
        this.#text = (text_+' '+text_);
        this.#original_size = this.#ctx.measureText(text_);
        this.#full_size = this.#ctx.measureText(this.#text);
        this.#break_point = Math.floor(Math.floor(this.#full_size.width)/2);
    };
    #clean(){
        this.#holder.removeChild(this.#canvas);

    };
    #round(){
        this.#position -= this.#speed;
        if(Math.abs(this.#position) > this.#break_point){
            this.#position += this.#break_point;
            }
        this.#render(); 
    };
    async #render(){
        this.#ctx.clearRect(
          0,
          0,
          this.#width,
          this.#height
        );
        this.#textSetup();
        this.#ctx.fillText(
          this.#text,
          this.#position,
          29,
        );
    };
    async #wait(){
        const delay = this.#interval-(Date.now()-this.#round_start);
        if(delay > 0)
            await new Promise(r=>setTimeout(r, delay));
    };
};
