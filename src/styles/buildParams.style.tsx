import CSS from 'csstype'

export const BuildFromStyle = {
    form: {},
    inputGroup: {},
    input: {
        flex: 1,
        padding: '8px',
        '&[type=number]': {
          '-moz-appearance': 'textfield',
          '-webkit-appearance': 'none'
        },
        '&::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
      },
}

export const cardStyle: CSS.Properties = {
    width: '25vw',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    marginLeft: '1.5em',
    marginTop: '1em',
    marginRight: '5vw',
}

export const labelParagraph: CSS.Properties = {
    marginTop: '15px'
}

export const listElement: CSS.Properties = {
    display: 'inline-flex'
}