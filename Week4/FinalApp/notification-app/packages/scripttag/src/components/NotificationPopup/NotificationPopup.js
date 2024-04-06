import React from 'react';
import './NoticationPopup.scss';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTj6DoZBwRbMkXGyBWrWXPtVTWUnqRYa7uNcAUqunH1z7ZGkpRG',
  setting,
  onClose
}) => {
  const classTitle = setting.truncateProductName ? 'Avada-SP__Subtitle-Hide' : 'Avada-SP__Subtitle';
  return (
    <div className={`Avava-SP__Wrapper Avava-SP__${setting.position}  animated`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <a href="" className={'Avava-SP__LinkWrapper'}>
              <div
                className="Avava-SP__Image"
                style={{
                  backgroundImage: `url(${productImage})`
                }}
              />
              <div className="Avada-SP__Content">
                <div className={'Avada-SP__Title'}>
                  {firstName} in {city}, {country}
                </div>
                <div className={classTitle}>purchased {productName}</div>
                <div className={'Avada-SP__Footer'}>
                  {!setting.hideTimeAgo ? timestamp : ''}
                  <span className="uni-blue">
                    <i className="fa fa-check" aria-hidden="true" /> by avada
                  </span>
                </div>
              </div>
            </a>
            <div
              onClick={onClose}
              style={{fontWeight: 'bold', cursor: 'pointer', marginRight: '10px'}}
            >
              x
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
