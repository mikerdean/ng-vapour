import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnChanges,
  type SimpleChanges,
} from "@angular/core";
import {
  icon as parseIcon,
  type FlipProp,
  type Icon,
  type IconDefinition,
  type SizeProp,
} from "@fortawesome/fontawesome-svg-core";

import type {
  ClassOrStyle,
  FontAwesomeAnimation,
  FontAwesomeRotation,
} from "@vapour/components/images/fontawesome.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: "fa-icon",
  templateUrl: "fontawesome-icon.component.svg",
})
export class FontawesomeIconComponent implements OnChanges {
  @Input() animation?: FontAwesomeAnimation;
  @Input() border = false;
  @Input() class?: ClassOrStyle;
  @Input() fixedWidth = false;
  @Input() flip?: FlipProp;
  @Input({ required: true }) icon!: IconDefinition;
  @Input() inverse = false;
  @Input() pull?: "left" | "right";
  @Input() rotate?: FontAwesomeRotation;
  @Input() size?: SizeProp;
  @Input() style?: ClassOrStyle;
  @Input() swapOpacity = false;

  parsedIcon!: Icon;

  ngOnChanges(changes: SimpleChanges): void {
    const iconChange = changes["icon"];

    if (iconChange) {
      this.parsedIcon = parseIcon(iconChange.currentValue);
    }
  }

  get classList(): ClassOrStyle {
    return {
      "svg-inline--fa": true,
      "fa-border": this.border,
      "fa-fw": this.fixedWidth,
      "fa-inverse": this.inverse,
      "fa-swap-opacity": this.swapOpacity,

      "fa-beat": this.animation === "beat",
      "fa-fade": this.animation === "fade",
      "fa-beat-fade": this.animation === "beat-fade",
      "fa-bounce": this.animation === "bounce",
      "fa-flip": this.animation === "flip",
      "fa-shake": this.animation === "shake",
      "fa-spin": this.animation === "spin",
      "fa-spin-pulse": this.animation === "spin-pulse",

      "fa-flip-horizontal": this.flip === "horizontal",
      "fa-flip-vertical": this.flip === "vertical",
      "fa-flip-both": this.flip === "both",

      "fa-pull-left": this.pull === "left",
      "fa-pull-right": this.pull === "right",

      "fa-rotate-by": this.rotate !== undefined,

      "fa-2xs": this.size === "2xs",
      "fa-xs": this.size === "xs",
      "fa-sm": this.size === "sm",
      "fa-lg": this.size === "lg",
      "fa-xl": this.size === "xl",
      "fa-2xl": this.size === "2xl",
      "fa-1x": this.size === "1x",
      "fa-2x": this.size === "2x",
      "fa-3x": this.size === "3x",
      "fa-4x": this.size === "4x",
      "fa-5x": this.size === "5x",
      "fa-6x": this.size === "6x",
      "fa-7x": this.size === "7x",
      "fa-8x": this.size === "8x",
      "fa-9x": this.size === "9x",
      "fa-10x": this.size === "10x",

      ...this.class,
    };
  }

  get styleList() {
    return {
      "--fa-rotate-angle": this.rotate ? `${this.rotate}deg` : undefined,
      ...this.style,
    };
  }

  get viewBox() {
    const [width, height] = this.parsedIcon.icon;
    return `0 0 ${width} ${height}`;
  }
}
