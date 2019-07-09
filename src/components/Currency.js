import React from 'react';

class Currency extends React.Component {
    render() {
        return (
            <div>
                <button
                    onClick={e =>
                        this.props.changeCurrency('USD', '$')
                    }
                    href="#"
                >
                    United States Dollar ($)
                </button>
                <button
                    onClick={e =>
                        this.props.changeCurrency('AUD', '$')
                    }
                    href="#"
                >
                    Australian Dollar ($)
                </button>
                <button
                    onClick={e =>
                        this.props.changeCurrency('CAD', '$')
                    }
                    href="#"
                >
                    Canadian Dollar ($)
                </button>
                <button
                    onClick={e =>
                        this.props.changeCurrency('EUR', '€')
                    }
                    href="#"
                >
                    Euro (€)
                </button>
                <button
                    onClick={e =>
                        this.props.changeCurrency('GBP', '£')
                    }
                    href="#"
                >
                    Pound Sterling (£)
                </button>
            </div>
        );
    }
}

export default Currency;