import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal'; // Or your chosen modal library
// import ReactImageZoom from 'react-image-zoom'; // Or your chosen zoom library
import styles from './clickableImageZoom.module.css';
import ImageZoom from './ImageZoom';
import { useTranslation } from 'react-i18next';

// Set the app element for react-modal (important for accessibility)
if (typeof document !== 'undefined') {
  Modal.setAppElement('#__next');
}


interface ClickableImageZoomProps {
    smallImageUrl:string, largeImageUrl:string, altText:string,data_image:any,data_SCHEDULER:string
}

const ClickableImageZoom: React.FC<ClickableImageZoomProps> = ({smallImageUrl,largeImageUrl,altText,data_image,data_SCHEDULER}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [IN_DETAIL_KDCAB,set_IN_DETAIL_KDCAB] = useState('')
    const [IN_DETAIL_LOCATION,set_IN_DETAIL_LOCATION] = useState('')
    const [IN_DETAIL_CAMERA,set_IN_DETAIL_CAMERA] = useState('')
    const [IN_DETAIL_IP,set_IN_DETAIL_IP] = useState('')
    const [IN_DETAIL_SCHEDULER,set_IN_DETAIL_SCHEDULER] = useState('')

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const zoomSettings = {
      width: 800, // Adjust as needed
      height: 600, // Adjust as needed
      zoomWidth: 100, // Width of the zoomed-in view
      img: largeImageUrl,
    };

    useEffect(()=>{
      set_IN_DETAIL_KDCAB(data_image.row.KDCAB)
      set_IN_DETAIL_LOCATION(data_image.row.LOCATION)
      set_IN_DETAIL_CAMERA(data_image.row.CAMERA)
      set_IN_DETAIL_IP(data_image.row.IP)
      set_IN_DETAIL_SCHEDULER(data_SCHEDULER)
    },[])
  
    return (
      <>
        <div className={styles.imageContainer} onClick={openModal}>
          <Image src={smallImageUrl} alt={altText} layout="responsive" width={500} height={400} objectFit="contain" style={{ cursor: 'pointer' }} />
        </div>
  
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 1000,
            },
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '30px',
              outline: 'none',
              padding: '20px',
              width: '40%',
              height: '85%',
            },
          }}
        >
          <button onClick={closeModal}>Close</button>  
          {/* <ImageZoom imageUrl={smallImageUrl} altText={altText} /> */}
          <Image src={smallImageUrl} alt={altText} layout="responsive" width={500} height={400} objectFit="contain" />
          <div className="grid grid-cols-2 gap-3">
            
            <div>
                <label htmlFor="groupFname">{t('Branch Code')}</label>
                <input disabled={true}  type="text" placeholder={t('Branch Code')} value={IN_DETAIL_KDCAB} className="text-xs form-input bg-dark-light" required />
            </div>
            <div>
                <label htmlFor="groupFname">{t('Location')}</label>
                <input disabled={true}  type="text" placeholder={t('Location')} value={IN_DETAIL_LOCATION} className="text-xs form-input bg-dark-light" required />
            </div>
            <div>
                <label htmlFor="groupFname">{t('Camera')}</label>
                <input disabled={true}  type="text" placeholder={t('Camera')} value={IN_DETAIL_CAMERA} className="text-xs form-input bg-dark-light" required />
            </div>
            <div>
                <label htmlFor="groupFname">{t('IP')}</label>
                <input disabled={true}  type="text" placeholder={t('IP')} value={IN_DETAIL_IP} className="text-xs form-input bg-dark-light" required />
            </div>
            <div>
                <label htmlFor="groupFname">{t('Scheduler')}</label>
                <input disabled={true}  type="text" placeholder={t('Scheduler')} value={IN_DETAIL_SCHEDULER} className="text-xs form-input bg-dark-light" required />
            </div>
            {/* <div className="mb-3 mt-4"><label htmlFor="dropdownLeftButton">{t('Branch Code')}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <input disabled={true}  type="text" placeholder={t('Branch')} value={IN_DETAIL_KDCAB} className="text-xs form-input bg-dark-light" required />
                </div>
            </div>
            <div className="mb-3 mt-4"><label htmlFor="dropdownLeftButton">{t('Location')}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <input disabled={true}  type="text" placeholder={t('Location')} value={IN_DETAIL_LOCATION} className="text-xs form-input bg-dark-light" required />
                </div>
            </div>
            <div className="mb-3 mt-4"><label htmlFor="dropdownLeftButton">{t('Camera')}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <input disabled={true}  type="text" placeholder={t('Camera')} value={IN_DETAIL_CAMERA} className="text-xs form-input bg-dark-light" required />
                </div>
            </div>
            <div className="mb-3 mt-4"><label htmlFor="dropdownLeftButton">{t('IP')}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <input disabled={true}  type="text" placeholder={t('IP')} value={IN_DETAIL_IP} className="text-xs form-input bg-dark-light" required />
                </div>
            </div>
            <div className="mb-3 mt-4"><label htmlFor="dropdownLeftButton">{t('Scheduler')}</label></div>
            <div className="mb-3">
                <div className="w-full">
                <input disabled={true} type="text" placeholder={t('Scheduler')} value={IN_DETAIL_SCHEDULER} className="text-xs form-input bg-dark-light" required />
                </div>
            </div> */}
          </div>
        </Modal>
      </>
    );
}
export default ClickableImageZoom;
