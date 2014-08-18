var code = "";
$('#addFrame').on('click', function(e){
   // $('#results').html(dumpInArray());
    code += dumpInArray();
});

$('#allOn').on('click', function(e){$('#boxes input[type="checkbox"]').each(function(){
    this.checked=true;
    display.allOn();
});});

$('#allOff').on('click', function(e){$('#boxes input[type="checkbox"]').each(function(){
    this.checked=false;
    display.allOff();
});});

function dumpInArray(){
    var i=0;
    row = 1;
    var str = ""
    var arr = [];
    $('#boxes input[type="checkbox"]').each(function(){
        arr.push(this.checked);
        var use = "0";
        if(this.checked)use="1";
        switch(i){
            case 0:
                str += 'B' + use;
                i++;
                break;
            case 3:
                str +=  use + ", ";

                i=0;
                             break;
            default:
                str +=use;
                i++;
        }
        this.checked=false;

    });
    str += "10, "
    display.allOff();
    return str;
}





$('#generateFile').on('click', function(e){
    $('#results').html(dumpInArray());
    var blob = new Blob([codeBefore, code, codeAfter], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.ino");
});


var codeBefore = "\/**\r\nThis program has been floating around the internet for ages, I don\'t know the original author, if it is yours, please email me for credit\r\n**\/\r\n\r\n#include <avr\/pgmspace.h> \/\/ allows use of PROGMEM to store patterns in flash\r\n\r\n#define CUBESIZE 4\r\n#define PLANESIZE CUBESIZE*CUBESIZE\r\n#define PLANETIME 100 \/\/ time each plane is displayed in us -> 100 Hz refresh\r\n#define TIMECONST 20 \/\/ multiplies DisplayTime to get ms - why not =100?\r\n\r\n\/\/ LED Pattern Table in PROGMEM - last column is display time in 100ms units\r\n\/\/ TODO this could be a lot more compact but not with binary pattern representation\r\nprog_uchar PROGMEM PatternTable[] = {\r\n";
var codeAfter = "\r\n\r\n\/\/ this is a dummy element for end of table (duration=0) aka !!!DO NOT TOUCH!!!\r\nB0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, B0000, 0\r\n};\r\n\r\n\/*\r\n** Defining pins in array makes it easier to rearrange how cube is wired\r\n** Adjust numbers here until LEDs flash in order - L to R, T to B\r\n** Note that analog inputs 0-5 are also digital outputs 14-19!\r\n** Pin DigitalOut0 (serial RX) and AnalogIn5 are left open for future apps\r\n*\/\r\n\r\nint LEDPin[] = {18,2,6,10,19,3,7,11,0,4,8,12,1,5,9,13 };\r\nint PlanePin[] = {14,15,16,17};\r\n\r\n\/\/ initialization\r\nvoid setup()\r\n{\r\nint pin; \/\/ loop counter\r\n\/\/ set up LED pins as output (active HIGH)\r\nfor (pin=0; pin<PLANESIZE; pin++) {\r\npinMode( LEDPin[pin], OUTPUT );\r\n}\r\n\/\/ set up plane pins as outputs (active LOW)\r\nfor (pin=0; pin<CUBESIZE; pin++) {\r\npinMode( PlanePin[pin], OUTPUT );\r\n}\r\n}\r\n\r\n\/\/ display pattern in table until DisplayTime is zero (then repeat)\r\nvoid loop()\r\n{\r\n\/\/ declare variables\r\nbyte PatternBuf[PLANESIZE]; \/\/ saves current pattern from PatternTable\r\nint PatternIdx;\r\nbyte DisplayTime; \/\/ time*100ms to display pattern\r\nunsigned long EndTime;\r\nint plane; \/\/ loop counter for cube refresh\r\nint patbufidx; \/\/ indexes which byte from pattern buffer\r\nint ledrow; \/\/ counts LEDs in refresh loop\r\nint ledcol; \/\/ counts LEDs in refresh loop\r\nint ledpin; \/\/ counts LEDs in refresh loop\r\n\r\n\/\/ Initialize PatternIdx to beginning of pattern table\r\nPatternIdx = 0;\r\n\/\/ loop over entries in pattern table - while DisplayTime>0\r\ndo {\r\n\/\/ read pattern from PROGMEM and save in array\r\nmemcpy_P( PatternBuf, PatternTable+PatternIdx, PLANESIZE );\r\nPatternIdx += PLANESIZE;\r\n\/\/ read DisplayTime from PROGMEM and increment index\r\nDisplayTime = pgm_read_byte_near( PatternTable + PatternIdx++ );\r\n\/\/ compute EndTime from current time (ms) and DisplayTime\r\nEndTime = millis() + ((unsigned long) DisplayTime) * TIMECONST;\r\n\r\n\/\/ loop while DisplayTime>0 and current time < EndTime\r\nwhile ( millis() < EndTime ) {\r\npatbufidx = 0; \/\/ reset index counter to beginning of buffer\r\n\/\/ loop over planes\r\nfor (plane=0; plane<CUBESIZE; plane++) {\r\n\/\/ turn previous plane off\r\nif (plane==0) {\r\ndigitalWrite( PlanePin[CUBESIZE-1], HIGH );\r\n} else {\r\ndigitalWrite( PlanePin[plane-1], HIGH );\r\n}\r\n\r\n\/\/ load current plane pattern data into ports\r\nledpin = 0;\r\nfor (ledrow=0; ledrow<CUBESIZE; ledrow++) {\r\nfor (ledcol=0; ledcol<CUBESIZE; ledcol++) {\r\ndigitalWrite( LEDPin[ledpin++], PatternBuf[patbufidx] & (1 << ledcol) );\r\n}\r\npatbufidx++;\r\n}\r\n\r\n\/\/ turn current plane on\r\ndigitalWrite( PlanePin[plane], LOW );\r\n\/\/ delay PLANETIME us\r\ndelayMicroseconds( PLANETIME );\r\n} \/\/ for plane\r\n} \/\/ while <EndTime\r\n} while (DisplayTime > 0); \/\/ read patterns until time=0 which signals end\r\n}\r\n";







