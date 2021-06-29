
export default function getFormattedTime(passedTimeInMilliseconds) {
    const totalSeconds = passedTimeInMilliseconds / 1_000;
    // const minutes = totalSeconds / 60;
    // const seconds = totalSeconds % 60;
    // const centiSeconds = (passedTimeInMilliseconds % 1000) / 10;
    const[minutes, seconds, centiSeconds] = [
        totalSeconds / 60,
        totalSeconds % 60,
        (passedTimeInMilliseconds % 1_000) / 10,
    ].map((total) => Math.floor(total).toString().padStart(2,"0"));

    return `${minutes} : ${seconds} . ${centiSeconds}`;
}