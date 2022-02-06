import { Radio, RadioProps } from "@material-ui/core";
import { ColorLens, Done } from "@material-ui/icons";

export const ColorPickerRadio = (props: RadioProps) => {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<Done style={{ color: "rgb(239, 239, 239)", fontSize: "2.2rem" }}/>}
        icon={<ColorLens style={{ color: "rgb(239, 239, 239)", fontSize: "2.2rem" }}/>}
        {...props}
      />
    );
  }