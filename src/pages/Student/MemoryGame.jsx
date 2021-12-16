import { useEffect, useState, useRef } from 'react';
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import "./css/memory.css"
import imgCenter from "../../assets/img/imgCenter.png"
import ExamServices from '../../services/ExamServices';
import { useHistory } from 'react-router';
import GameService from '../../services/GameService';
import SweetAlert from 'react-bootstrap-sweetalert';
import UserServices from "../../services/UserServices.jsx";
import MemorySetting from './MemorySetting';

export default function MemoryGame() {
    const [isStarted, setStart] = useState(false);
    const [options, setOptions] = useState([]);
    const [level, setLevel] = useState(null);
    const [listQuestion, setListQuestion] = useState([]);
    const [listAnswer, setListAnswer] = useState([]);
    const [cards, setCards] = useState([]);
    const [point, setPoint] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [bonus, setBonus] = useState(0);
    const [total, setTotal] = useState(0);
    const [num, setNum] = useState(100);
    const [hasAchievement, setHasAchievement] = useState([]);
    const history = useHistory();

    let myInterval = useRef();

    useEffect(() => {
        switch (level) {
            case 12:
                setNum(180);
                break;
            case 18:
                setNum(270);
                break;
            case 24:
                setNum(360);
                break;
        }

    }, [level])

    let minute = parseInt(num / 60);
    let second = num % 60;

    const countdown = () => {
        if (second > 0) {
            second = second - 1;
        }
        if (second === 0) {
            if (minute === 0) {
                setIsFinish(true);
            } else {
                minute = minute - 1;
                second = 59;
            }
        }
        document.getElementById("minute").innerHTML = minute;
        document.getElementById("second").innerHTML = (second < 10 ? `0${second}` : second);
    }
    useEffect(() => {
        if (isStarted) {
            if (isFinish) {
                clearInterval(myInterval.current);
                saveResult();
            } else {
                myInterval.current = setInterval(countdown, 1000);
            }
        }
        return () => clearInterval(myInterval.current);
    }, [isStarted, isFinish]);


    useEffect(() => {
        if (options.length > 0) {
            ExamServices.getListQuestion(options[0])
                .then((res) => {
                    setListQuestion(
                        res.data.listQuestions.map((item, index) => ({
                            id: item.questionID,
                            content: item.question,
                            matched: false
                        }))
                    );
                    setListAnswer(
                        res.data.listQuestions.map((item, index) => ({
                            id: item.questionID,
                            content: item.answer[0].answer,
                            matched: false
                        })));
                })
                .catch((err) => console.error(err));
        }
    }, [options.length > 0]);

    const shuffleCards = () => {
        const shuffledCards = [...listQuestion, ...listAnswer].sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, preId: Math.random() }))
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setPoint(0);
    }
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }
    useEffect(() => {
        shuffleCards()
    }, [listQuestion, listAnswer])

    useEffect(() => {
        let count = 0;
        if (cards.length > 0) {
            cards.map((card) => {
                card.matched ? count++ : count = 0;
            })
            if (count === cards.length) setIsFinish(true);
        }
    }, [cards])

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.id === choiceTwo.id) {
                setPoint(prevPoint => prevPoint + 100);
                setCards(prevCards => {
                    return prevCards.map((card) => {
                        if (card.id === choiceOne.id) {
                            return { ...card, matched: true }
                        } else {
                            return card;
                        }
                    })
                })
                resetTurn();
            } else {
                point > 0 ? setPoint(prevPoint => prevPoint - 5) : setPoint(0);
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        // setPoint(prevPoint => prevPoint - 10);
        setDisabled(false);
    }

    const saveResult = () => {
        let secondLeft = parseInt(document.getElementById("second").innerHTML);
        let minuteLeft = parseInt(document.getElementById("minute").innerHTML);
        let bonusCurrent = (minuteLeft * 60 + secondLeft) * 10;
        let totalScore = point + bonusCurrent;
        setBonus(bonusCurrent);
        setTotal(point + bonusCurrent);
        document.getElementById("flips").innerHTML = point;
        GameService.fetchSaveGame(3, "Memory Game", "", (num - (minuteLeft * 60 + secondLeft)), totalScore);
        UserServices.checkAchievement().then((res) => {
            // console.log(`res`, res)
            setHasAchievement(res.data);
            // setHasAchievement([{ name: "Thợ săn level", desciption: "Đạt 5000 điểm (Lv9)" }])
        })
    }
    const hideAlert = () => {
        setHasAchievement([]);
    }



    return (
        <div>
            <div class="alert-wrapper position-absolute" >
                {hasAchievement.length !== 0 ?
                    < SweetAlert success title="Chúc mừng bạn đạt được thành tựu mới!" timeout={10000} onConfirm={hideAlert}>
                        <h3> {hasAchievement[0].name}</h3>
                        <h4>{hasAchievement[0].desciption}</h4>
                    </SweetAlert > : ""}
            </div>
            <div
                style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}>
                <Navigation />
                <div className="container" role="game" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px", position: "relative" }}>
                    <div class="row mt-2" >
                        {isFinish ? <div class="overlay-text visible">
                            <div class="game-over">Kết thúc</div>
                            <div class="result">
                                <h4>Điểm bonus : {bonus}</h4>
                                <h4>Tổng điểm : {total}</h4>
                            </div>
                            <br />
                            <div class="text-play-again" onClick={() => history.go(0)}>Click vào đây để chơi lại </div>

                        </div> : ""}
                        <div class="col-md-12" >
                            <h1 class="page-title"> Memory Game </h1>
                            {!isStarted ? <MemorySetting isStartedProps={setStart} setOptions={setOptions} setLevel={setLevel} /> : (<>
                                <div className="game-container">

                                    <div className="game-info-container">
                                        <div className="game-info">
                                            Thời gian <span id="time-remaining">
                                                <span id="minute"></span>:
                                                <span id="second"></span>
                                            </span>
                                        </div>
                                        <div className="game-info">
                                            Điểm <span id="flips"> {point} </span>
                                        </div>
                                    </div>
                                    {cards.map((card, index) => (
                                        <div className={card === choiceOne || card === choiceTwo ? "card flipped" : card.matched ? "card flipped matched" : "card"} role="game" key={index}>
                                            <div className="card-back card-face shadow-lg" onClick={() => !disabled ? handleChoice(card) : ""}>
                                                <img class="imgCenter" src={imgCenter} />
                                            </div>
                                            <div className="card-front card-face shadow-lg">
                                                <h5 class="card-value">{card.content}</h5>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </>)}
                        </div>
                    </div>
                </div>

                {/* <Footer /> */}
            </div>
        </div>
    )
}

