module.exports = 
function Sanatize(sentence) {
    return sentence.split(' ').map( text => {

        text = text.replace(/يء/, 'ي');
        text = text.replace(/ءا/, 'آ');
        text = text.replace(/ويءادم/, 'ويآدم');
        text = text.replace(/يادم/, 'يآدم');
        text = text.replace(/ءادم/, 'آدم');
        text = text.replace(/لءآدم/, 'لآدم');
        text = text.replace(/رآ/, 'رءا');
        text = text.replace(/تبوآ/,'تبوءا');
        text = text.replace(/جزآ/, 'جزءا');
        text = text.replace(/ورآ/,'ورءا');
        text = text.replace(/ترآ/, 'ترءا');
        text = text.replace(/سوآ/, 'سوءا');
        text = text.replace(/ردآ/, 'ردءا');
        text = text.replace(/يستء/, 'يست');
        text = text.replace(/الءن/, 'الن');
        text = text.replace(/ألءن/, 'ألن');
        text = text.replace(/آلءن/, 'آلن');
        text = text.replace(/لءي/, 'لي');
        text = text.replace(/لءو/, 'لو');
        text = text.replace(/بءو/, 'بؤ');
        text = text.replace(/سءو/, 'سؤ');
        text = text.replace(/كءو/, 'كؤ');
        text = text.replace(/هءو/, 'هؤ');
        text = text.replace(/فءو/, 'فؤ');
        text = text.replace(/زءو/, 'زؤ');
        text = text.replace(/نءو/, 'نؤ');
        text = text.replace(/تءو/, 'تؤ');
        text = text.replace(/طءو/, 'طؤ');        
        text = text.replace(/كءي/, 'كي');
        text = text.replace(/زءي/, 'زي');
        text = text.replace(/سءي/, 'سي');
        text = text.replace(/بءي/, 'بي');
        text = text.replace(/سء/, 'س');
        text = text.replace(/ىه/, 'يه');
        text = text.replace(/ىل/, 'يل');
        text = text.replace(/ىك/, 'يك');
        text = text.replace(/ىة/, 'ية');
        text = text.replace(/تىن/, 'تين');                
        text = text.replace(/أفءدة/, 'أفدة');
        text = text.replace(/والأفءدة/, 'والأفدة');
        text = text.replace(/أنجىنا/, 'أنجينا');
        text = text.replace(/أفءدتهم/, 'أفدتهم');
        text = text.replace(/تجءرون/, 'تجرون');
        text = text.replace(/المستءخرين/, 'المستخرين');
        text = text.replace(/شطءه/, 'شطه');
        text = text.replace(/استءذن/, 'استذن');
        text = text.replace(/استءذنوك/, 'استذنوك');
        text = text.replace(/ووقىنا/, 'ووقينا');
        text = text.replace(/لخطءين/, 'لخطين');
        text = text.replace(/يجءرون/, 'يجرون');
        text = text.replace(/جءروا/, 'جروا');        
        text = text.replace(/قرءان/, 'قرآن');
        return text
    }).join(' ') 
}

// console.log(Sanatize('ولئن أتيت الذين أوتوا الكتٰب بكل ءاية ما تبعوا قبلتك وما أنت بتابع قبلتهم وما بعضهم بتابع قبلة بعض ولئن اتبعت أهواءهم من بعد ما جاءك من العلم إنك إذا لمن الظٰلمين'))