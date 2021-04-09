import { FunctionComponent } from "react"
import { ImageProps as NextImageProps } from "next/image"

type ImageProps = {
} & NextImageProps

const Image: FunctionComponent<ImageProps> = ({ src, width, height, className }) => {
  return (
    <img className={className} src={src} width={width} height={height} />
  )
}

export default Image
