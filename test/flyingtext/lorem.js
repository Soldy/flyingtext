'use strict';


/**
 * @prototype
 */
const loremBase = function(){
    /**
     * @param {integer}
     * @public
     * @return {string}
     */
    this.word = function(size){
        return _word(size);
    };
    /**
     * @param {integer}
     * @public
     * @return {string}
     */
    this.stence = function(size){
        return _stence(size);
    };
    /**
     * @param {integer}
     * @public
     * @return {string}
     */
    this.paragraph = function(size){
        return _paragraph(size);
    };
    /**
     * @const {array}
     */
    const _stence_end = ['.','.','.','.','?','!'];
    /*(
     * @const {array}
     */
    const _single = ['a','e','i','o','u'];
    /**
     * @const {array}
     */
    const _multi = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','x','y','z'];
    /**
     * @const {array}
     */
    const _single_double = ['ei','ie','io','iu','oi','ua','ui'];
    /**
     * @const {array}
     */
    const _multi_double = [
        'cc','ch','ct','cr','dd',
        'dh','dm','dr','dv','ff',
        'fr','gg',
        'gn','gh','ll','lv','ls',
        'mn','mp','nd','nm','ps',
        'pg','rd','rt','sp','st',
        'ss','tr','tp'
    ];
    /**
     * @var {string}
     */
    let _type = '';
    /**
     * @var {integer}
     */
    let _size = 9;
    /**
     * @const {array}
     */
    const _one_word = ['a','i','o'];
    /**
     * @const {array}
     */
    const _two_word = ['an','az','la', 'do', 'qo','it','is','me','we'];
    /**
     * @private
     * @return {string}
     */
    const _any = function(){
        if(Math.random()*5 > 1){
            return _one();
        }else{
            return _double();
        }
    };
    /**
     * @private
     * @return {string}
     */
    const _one = function(){
        if(_type === 'multi'){
            _type = 'single';
            return _formArray(_single);
        }else{
            _type = 'multi';
            return _formArray(_multi);
        }
    };
    /**
     * @private
     * @return {string}
     */
    const _double = function(){
        if(_type === 'multi'){
            _type = 'single';
            return _formArray(_single_double);
        }else{
            _type = 'multi';
            return _formArray(_multi_double);
        }

    };
    /**
     * @param {array}
     * @private
     * @return {string}
     */
    const _formArray = function(arr){
        return arr[Math.floor(Math.random()*arr.length)];
    };
    /**
     * @param {integer}
     * @private
     * @return {integer}
     */
    const _wordSizeGenerator = function(size){
        if(typeof size === 'undefined')
            return size = Math.floor(Math.random()*6)+3;
        return size;
    };
    /**
     * @param {integer}
     * @private
     * @return {string}
     */
    const _word = function(size){
        let word = '';
        size = _wordSizeGenerator(size);
        if(size === 0)
            return '';
        if(size === 1)
            return _formArray(
                _one_word
            );
        if(size === 2)
            return _formArray(
                _two_word
            );
        _type = _formArray(['single','multi']);
        while(true){
            if(word.length+2 > size)
                word +=  _one();
            else
                word += _any();
            if(word.length >= size)
                break;
        }
        return word;
    };
    /**
     * @param {string}
     * @private
     * @return {string}
     */
    const _firstUpper = function(word){
        return word.charAt(0).toUpperCase()+word.slice(1);
    };
    /**
     * @param {integer}
     * @private
     * @return {integer}
     */
    const _stenceSizeGenerator = function(size){
        if(typeof size === 'undefined')
            return size = Math.floor(Math.random()*18)+3;
        return size;
    };
    /**
     * @param {integer}
     * @private
     * @return {string}
     */
    const _stence = function(size){
        let stence = _firstUpper(
            _word()
        );
        size = _stenceSizeGenerator(size);
        for (let i = 1 ; size > i; i++){
            if(
                (i>4)&&
                ((Math.random()*12)>10.5)
            )
                stence += ',';
            stence += ' '+_word();
        }
        stence +=_formArray(
            _stence_end
        );
        return stence;
    };
    /**
     * @param {integer}
     * @private
     * @return {integer}
     */
    const _paragraphSizeGenerator = function(size){
        if(typeof size === 'undefined')
            return size = Math.floor(Math.random()*18)+5;
        return size;
    };
    /**
     * @param {integer}
     * @private
     * @return {string}
     */
    const _paragraph = function(size){
        let paragraph = '    '+_stence();
        size = _paragraphSizeGenerator(size);
        for (let i = 1 ; size > i; i++)
            paragraph += ' '+_stence();
        return paragraph;
    };
};
