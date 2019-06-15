function puzzlesLoaded(p) {
    timer.cube = p;
    timer.scr = p[timer.scrType].generateScramble();
    timer.nextScr = timer.cube[timer.scrType].generateScramble();
}

const timer = new Vue({
    el: '#timer',
    data: {
        time: 0,
        timing: false,
        scores: {
            '333': [],
            '444':[],
            '555':[],
            '666':[],
            '777':[],
            'pyram':[],
            'sq1':[],
            'minx':[],
            'clock':[],
            'skewb':[],
        },
        selectedScore:[],
        type: "三阶速拧-WCA",
        scr: 'srcamble',
        color: '',
        cube: null,
        scrType: '333',
        table:{
            '333': '三阶速拧-WCA',
            '444':'四阶速拧-WCA',
            '555':'五阶速拧-WCA',
            '666':'六阶速拧-WCA',
            '777':'七阶速拧-WCA',
            'pyram':'金字塔',
            'sq1':'SQ-1',
            'minx':'五魔方',
            'skewb':'斜转',
        },
        fast:{
            'default':'无',
            '333': null,
            '444':null,
            '555':null,
            '666':null,
            '777':null,
            'pyram':null,
            'sq1':null,
            'minx':null,
            'skewb':null,
        },
        ao5:'无',
        nextScr:null,
        
    },
    methods: {
        begin: () => {
            timer.timing = !timer.timing;
            if (timer.timing) {
                var start = new Date().getTime();
                //console.log(start)
                timer.time = 0;
                //nextScr=timer.cube[timer.scrType].generateScramble();
                hand = setInterval(() => {
                    if (timer.timing) timer.time = ((new Date().getTime() - start) / 1000).toFixed(3);
                }, 1);
            } else {
                clearInterval(hand);
                let scoreType=timer.scrType;
                timer.scores[scoreType].unshift({
                    score:timer.time,
                    scramble:timer.scr,
                });
                var fast=timer.fast;
                if(isNaN(fast['default'])||fast['default']>timer.time){
                    fast['default']=timer.time;
                    fast[timer.scrType]=timer.time;
                }
                timer.selectedScore=timer.scores[scoreType];
                timer.ao5=timer.selectedScore.length<5?'无':(timer.selectedScore.slice(0,5).map((x)=>{return x.score/1}).reduce((x,y)=>{return x+y})/5).toFixed(3);
                console.log(timer.selectedScore.slice(0,5).map((x)=>{return x.score/1}));
                timer.scr = timer.nextScr;
                setTimeout(() => {
                    timer.nextScr=timer.cube[timer.scrType].generateScramble();
                }, 100);
            }
        },

        by:(a)=>{
            timer.scrType=a;
            timer.type=timer.table[a];
            timer.selectedScore=timer.scores[a];
            timer.scr = timer.cube[timer.scrType].generateScramble();
            timer.nextScr = timer.cube[timer.scrType].generateScramble();
        },
    },
    //全局键盘事件
    created() {
        var down = false;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if (key == 32 & !timer.timing & !down) {
                down = true
                timer.color = 'red';
                holdRed = setTimeout(() => {
                    if (timer.color == 'red') timer.color = 'green';
                }, 700)
            }
            if (key == 32 & timer.timing) {
                timer.begin();

            }
        };
        document.onkeyup = function (e) {
            let key = window.event.keyCode;
            if (key == 32 & !timer.timing & timer.color == 'green') {
                down = false;
                timer.color = '';
                timer.begin();
            }
            if (key == 32 & timer.color == 'red') down = false;
            timer.color = '';
        };
    }
});