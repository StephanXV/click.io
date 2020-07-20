import $ from "jquery";
import {setStyle, setAttributes} from "./utils";
import TargetManager from "./TargetManager";

{
    let aimIo = function() {

        // font import
        let font = document.createElement('link');
        setAttributes(font, {
            href: 'https://fonts.googleapis.com/css?family=Iceland',
            rel: 'stylesheet'
        });
        document.head.appendChild(font);

        let root = document.getElementById('root');
        setStyle(root, {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        });

        let leftbar = document.createElement('sidebar');
        setStyle(leftbar, {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            right: '75%',
            bottom: 0,
            left: 0,
            margin: '10px 5px 10px 10px',
            padding: '5px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center'

        });
        setAttributes(leftbar, {
            id: 'leftbar'
        });
        root.appendChild(leftbar);

        let titleContainer = document.createElement('div');
        setStyle(titleContainer, {
            width: '100%',
            textAlign: 'center'
        });
        leftbar.appendChild(titleContainer);

        let title = document.createElement('h1');
        title.innerText = 'Aim.io';
        setStyle(title, {
            fontFamily: 'Iceland'
        });
        titleContainer.appendChild(title);

        let menuContainer = document.createElement('div');
        setStyle(menuContainer, {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            textAlign: 'center'
        });
        leftbar.appendChild(menuContainer);

        let buttonStart = document.createElement('button');
        buttonStart.innerText = 'Start';
        setStyle(buttonStart, {
            width: '70%',
            height: '30px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center',
            fontFamily: 'Iceland',
            margin: '0px auto 10px auto'
        });
        menuContainer.appendChild(buttonStart);

        let buttonReset = document.createElement('button');
        buttonReset.innerText = 'Reset';
        setStyle(buttonReset, {
            width: '70%',
            height: '30px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center',
            fontFamily: 'Iceland',
            margin: '0px auto 10px auto'
        });

        let diffTitleContainer = document.createElement('div');
        setStyle(diffTitleContainer,  {
            width: '70%',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center',
            margin: '100px auto 10px auto'
        });

        menuContainer.appendChild(diffTitleContainer);
        let difficultyContainer = document.createElement('div');
        setStyle(difficultyContainer,  {
            width: '70%',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'space-between',
            margin: '0px auto 10px auto'
        });
        menuContainer.appendChild(difficultyContainer);

        let diffTitle = document.createElement("span");
        diffTitle.innerText = "Difficulty:";
        setStyle(diffTitle, {
            fontFamily: 'Iceland',
        });
        diffTitleContainer.appendChild(diffTitle);

        let diffValue = document.createElement("span");
        diffValue.innerText = "Easy";
        setStyle(diffValue, {
            fontFamily: 'Iceland',
        });
        diffTitleContainer.appendChild(diffValue);

        let easyDiff = document.createElement('button');
        easyDiff.innerText = "Easy";
        setAttributes(easyDiff, {
            id: 'easy'
        });
        setStyle(easyDiff, {
            width: '30%',
            height: '30px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center',
            fontFamily: 'Iceland',
        });
        difficultyContainer.appendChild(easyDiff);

        let mediumDiff = document.createElement('button');
        mediumDiff.innerText = "Medium";
        setAttributes(mediumDiff, {
            id: 'medium'
        });
        setStyle(mediumDiff, {
            width: '30%',
            height: '30px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center',
            fontFamily: 'Iceland',
        });
        difficultyContainer.appendChild(mediumDiff);

        let hardDiff = document.createElement('button');
        hardDiff.innerText = "Hard";
        setAttributes(hardDiff, {
            id: 'medium'
        });
        setStyle(hardDiff, {
            width: '30%',
            height: '30px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center',
            fontFamily: 'Iceland',
        });
        difficultyContainer.appendChild(hardDiff);

        let switchDifficulty = function(difficulty) {
            diffValue.innerText = difficulty;
        };

        easyDiff.addEventListener("click", () => {
            switchDifficulty(easyDiff.innerText);
        });
        mediumDiff.addEventListener("click", () => {
            switchDifficulty(mediumDiff.innerText);
        });
        hardDiff.addEventListener("click", () => {
            switchDifficulty(hardDiff.innerText);
        });

        let timerContainer = document.createElement('div');
        setStyle(timerContainer, {
            width: '100%',
            textAlign: 'center',
            marginTop: '150px',
        });

        let timer = document.createElement('h1');
        setStyle(timer, {
            fontFamily: 'Iceland'
        });
        timerContainer.appendChild(timer);

        let scoreContainer = document.createElement('div');
        setStyle(scoreContainer, {
            width: '100%',
            textAlign: 'center'
        });

        let score = document.createElement('h2');
        score.innerText = 'Score: 0';
        setStyle(score, {
            fontFamily: 'Iceland'
        });
        scoreContainer.appendChild(score);

        let area = document.createElement('section');
        setStyle(area, {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: '25%',
            margin: '10px 10px 10px 5px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            padding: '50px'
        });
        root.appendChild(area);

        let wrapper = document.createElement('div');
        setStyle(wrapper, {
            pointerEvents: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
        });
        root.appendChild(wrapper);

        let resultView = document.createElement('div');
        setStyle(resultView, {
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            height: '15%',
            width: '30%',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center'
        });
        let resultTitle = document.createElement('div');
        resultTitle.innerText = 'GAME OVER';
        setStyle(resultTitle, {
            margin: '10px auto 0px auto',
            fontFamily: 'Iceland',
            fontSize: '24px',
            fontWeight: 'bolder',
        });
        resultView.appendChild(resultTitle);

        let resultScore = document.createElement('div');
        resultScore.innerText = '0';
        setStyle(resultScore, {
            margin: '10px auto 0px auto',
            fontFamily: 'Iceland',
            fontSize: '16px',
        });
        resultView.appendChild(resultScore);

        let resultButtonReset = document.createElement('button');
        resultButtonReset.innerText = 'Reset';
        setStyle(resultButtonReset, {
            width: '50%',
            height: '30px',
            border: 'solid',
            borderWidth: '1.5px',
            borderColor: 'black',
            borderRadius: '0px',
            textAlign: 'center',
            fontFamily: 'Iceland',
            margin: '10px auto 0px auto'
        });
        resultView.appendChild(resultButtonReset);

        buttonStart.addEventListener("click", (event) => {
            startGame();
            event.preventDefault();
        });

        buttonReset.addEventListener("click", (event) => {
            reset();
            targetManager.reset();
            event.preventDefault();
        });

        resultButtonReset.addEventListener("click", (event) => {
            reset();
            targetManager.reset();
            event.preventDefault();
        });

        // rimozione interfaccia di gioco e reset degli intervalli
        let reset = function() {
            leftbar.removeChild(scoreContainer);
            leftbar.removeChild(timerContainer);
            menuContainer.removeChild(buttonReset);
            menuContainer.prepend(buttonStart);
            if (wrapper.hasChildNodes()) {
                wrapper.removeChild(resultView);
            }
            clearInterval(timeInterval);
            clearInterval(gameChecker);
        };

        let timeInterval;
        let gameChecker;
        let targetManager;

        let startGame = function() {

            // raccolta livello di difficoltà
            let multiplier;
            console.log("Difficulty chosen: " + diffValue.innerText);
            switch(diffValue.innerText) {
                case "Easy":
                    multiplier = 1.5;
                    break;
                case "Medium":
                    multiplier = 1;
                    break;
                case "Hard":
                    multiplier = 0.7;
                    break;
                default:
                    multiplier = 1.5;
            }

            // interfacciamento con TargetManager; Target non viene mai usato qui
            targetManager = new TargetManager(area, multiplier);

            // aggiunta interfaccia di gioco
            menuContainer.removeChild(buttonStart);
            menuContainer.prepend(buttonReset);
            timer.innerText = 'Time left: ' + targetManager.getTime();
            leftbar.appendChild(timerContainer);
            leftbar.appendChild(scoreContainer);


            // counter
            timeInterval = setInterval(function() {
                timer.innerText = 'Time left: ' + targetManager.getTime()
            }, 1000);

            // intervallo per raccogliere info aggiornate in tempo reale
            gameChecker = setInterval(function() {
                score.innerText = 'Score: ' + targetManager.getScore();
                if (!targetManager.isInGame()) {
                    printResult();
                    clearInterval(timeInterval);
                    clearInterval(gameChecker);
                }
            }, 50);
        };

        // gioco finito, mostra lo score finale
        let printResult = function () {
            console.log("Punteggio: " + targetManager.getScore());
            resultScore.innerText = "Score: " + targetManager.getScore();
            wrapper.appendChild(resultView);
        };


    };

    $(aimIo);
}
