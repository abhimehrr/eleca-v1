import { Link } from 'react-router-dom'

export default function DonwloadImage({imgUrl, imgName}) {
    return (
        <Link to={imgUrl} download={imgName} target='_blank' className="absolute bottom-0 right-0 py-1 px-2 bg-gray-700 text-gray-300 hover:bg-gray-900 opacity-80 rounded transition-all" >
            <i className="fa-solid fa-download text-sm"></i>
        </Link>
    )
}