export default function getTimeString(totalSeconds, inProcessTime) {
  const min = Math.floor((totalSeconds - inProcessTime) / 60)
  const sec = (totalSeconds - inProcessTime) % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}
