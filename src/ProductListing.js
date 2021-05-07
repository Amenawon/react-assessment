import React from 'react';
import { slideDown, slideUp } from './anim';


function formatDate(date) {
    return date.substr(0, 10);
  }
  


class ProductListing extends React.Component {
  state = { expanded: false }

  toggleExpander = (e) => {
    if (e.target.type === 'checkbox') return;

    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }

  render() {
    const { product } = this.props;
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td className="uk-text-nowrap">{this.props.index}.</td>
        <td>{product.name}</td>
        {/* <td>{capitalize(user.location.city)} ({user.nat})</td>
        <td>{formatDate(user.registered)}</td> */}
      </tr>,
      this.state.expanded && ( product.prices.map((item, index) =>
       <tr className="expandable" key="tr-expander">
          <td className="" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
            <div className="uk-width-3-4">
   <b> <p>Price at {formatDate(item.date)} was {item.price}</p></b>
                {/* <p>
                  Address:<br/>
                  <i>
                    {capitalize(user.location.street)}<br/>
                    {user.location.postcode} {capitalize(user.location.city)}<br/>
                    {user.nat}
                  </i>
                </p>
                <p>
                  E-mail: {user.email}<br/>
                  Phone: {user.phone}
                </p>
               */}
              </div>
            </div>
          </td>
        </tr>
      )
      )
    ];
  }
}


export default ProductListing