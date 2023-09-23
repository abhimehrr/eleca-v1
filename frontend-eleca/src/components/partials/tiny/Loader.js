import { ProgressBar } from 'react-loader-spinner'

export default function Loader() {
  return (
    <ProgressBar
        height="75"
        width="100"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = 'teal'
        barColor = 'teal'
    />
  )
}