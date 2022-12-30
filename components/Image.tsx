import { FunctionComponent } from "react"

type ImageProps = {
  alt: string
  src: string
  width: string
  height: string
  className: string
}

/* eslint-disable @next/next/no-img-element */
const Image: FunctionComponent<ImageProps> = ({ alt, src, width, height, className }) => {
  return (
    <img className={className} alt={alt} src={src} width={width} height={height} />
  )
}

export default Image
