(() => {
    //Grab the canvas in HTML, set size and position
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");

    const screenDiv = <HTMLDivElement>document.getElementById("screen");
    canvas.style.left = (screenDiv.offsetLeft+15).toString()+"px";
    canvas.style.top = (screenDiv.offsetTop+15).toString()+"px";
    canvas.style.position = "absolute";
    canvas.height = screenDiv.offsetHeight-30;
    canvas.width = screenDiv.offsetWidth-30;

    class PrintLines {
        lineCnt: number;
        lineData: any;
        lineLenMax: number;
        constructor(lines: number) {
            this.lineCnt = lines;
            this.lineLenMax = (canvas.width-(canvas.width%20))/20;
            this.lineData = [];
            this.print("SSH CONNECT -> COMPANY ISP");
        }
        
        print(message: string) {
            //Character width is ~20
            let newMsgs: string[][] = [[]];
            let tokenizedMsg = message.split(" ");
            let currentLineLen = 0;
            let currentLine = 0;
            for (let index = 0; index < tokenizedMsg.length; index++) {
                let item = tokenizedMsg[index];
                if ((item.length + currentLineLen) <= this.lineLenMax) {
                    newMsgs[currentLine].push(item);
                    currentLineLen += item.length;
                }
                else {
                    currentLineLen = 0;
                    currentLine++;
                    newMsgs.push([item]);
                }
            }
            
            for (let index = 0; index < newMsgs.length; index++) {
                this.lineData.push(newMsgs[index].join(" "));
            }
        }
    }
    
    let lines = new PrintLines(2);
    
    function resizeHandler() {
        canvas.height = screenDiv.offsetHeight-30;
        canvas.width = screenDiv.offsetWidth-30;
        lines.lineCnt = ((canvas.height-40)-(canvas.height-40)%30)/30;
        lines.lineLenMax = (canvas.width-(canvas.width%20))/20;
    }
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    
    function commands(command: string) {
        switch (command.toLowerCase()) {
            case "help":
                lines.print("Here some useful commands: ");
                lines.print("'whoIs' - Who (or what) are you typing to right now");
                lines.print("'traceRoute' - Run a standard practice packet delivery, will attempt from start of the sequence (the user) to the end (our servers)");
                lines.print("'clear' - clears the screen of text");
                lines.print("'next' - if you think you are good here move on to the next stop");
                lines.print("'back' - opposite of next (back a page)");
                lines.print("ACK - Acknowledge, passed test");
                break;

            case "whois":
                lines.print("This is the ISP provider for the company, in our case, and for others, this is a high bandwidth connection specialized for large volumes of data that a typical user would not see. Beyond that it operates just the same as the USER network.");
                break;

            case "traceroute":
                lines.print("DataIntegrity: [OK]");
                lines.print("Ping: [30]");
                lines.print("Traceroute-Hop: FAIL :: NO-RESPONSE :: FOUR-HOP ACK");
                break;

            case "clear":
                lines.lineData = [];
                break;
        
            case "next":
                window.location.href = "http://localhost:3000/Company_Router";
                break;

            case "back":
                window.location.href = "http://localhost:3000/Internet_Backbone";
                break;
            
            default:
                lines.print("Invalid command, please try again! (Try Help)");
                break;
        }
    }

    let inputArr: any = [];
    let scrollOffset = 1;
    document.addEventListener("keydown", function(event) {
        if (event.code.length > 4) {
            if (event.code == "Enter") {
                scrollOffset = 1;
                let message = inputArr.join("")
                lines.print(message);
                commands(message);
                inputArr = [];
            }
            else if (event.code == "Backspace") {
                inputArr.pop();
            }
            else if (event.code == "Space") {
                inputArr.push(event.key);
            }
            else if (event.code == "ArrowUp") {
                if ((scrollOffset + 1) < lines.lineData.length) {
                    scrollOffset++;
                }
            }
            else if (event.code == "ArrowDown") {
                if ((scrollOffset - 1) > 0) {
                    scrollOffset--;
                }
            }
        }
        else {
            inputArr.push(event.key);
        }
    });

    const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

    
    //Loading in a new font
    const f = new FontFace("Terminal", "url(/fonts/Bitwise-m19x.ttf) format(truetype)")
    function textDraw(message: string, color: string, height: number) {
        let msg = message || " ";
        ctx.fillStyle = color;
        f.load().then(() =>{
            ctx.font = "24px Terminal";
            ctx.fillText(msg.split("").join(String.fromCharCode(8202)), 10, height);
        });
    }

    function renderLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < lines.lineCnt; index++) {
            textDraw(lines.lineData[(lines.lineData.length-(1*scrollOffset))-index], "#5dbf4e", (canvas.height-40)-(index*30));
        }
        textDraw(`-> ${inputArr.join("")}`, "#5dbf4e", (canvas.height-10));

        requestAnimationFrame(renderLoop);
    }
    renderLoop();
})();