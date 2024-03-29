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
        '&::WebkitOuterSpinButton': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '&::WebkitInnerSpinButton': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
      },
}

export const cardStyle: CSS.Properties = {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    marginRight: '1.5em',
    top: '1em',
    left: '1.5em',
    minWidth: '30%',
    
}

export const labelParagraph: CSS.Properties = {
    marginTop: '15px'
}

export const listElement: CSS.Properties = {
    display: 'inline-flex'
}