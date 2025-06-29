import Image from 'next/image'

interface ImageComponentProps{
  dataURL:string,authorAlt:string,imageQuality:number,type_loading:any
}

const ImageComponent: React.FC<ImageComponentProps> = ({dataURL,authorAlt,imageQuality,type_loading}) => {
  return (
    <Image
      className='text-danger font-semibold underline'
      src={dataURL}
      width={500}
      height={500}
      alt={authorAlt}
      quality={imageQuality}
      loading={type_loading}
    />
  )
}
export default ImageComponent;
