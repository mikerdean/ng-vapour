import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
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
export class FontawesomeIconComponent {
  readonly animation = input<FontAwesomeAnimation>();
  readonly border = input(false);
  readonly class = input<ClassOrStyle>();
  readonly fixedWidth = input(false);
  readonly flip = input<FlipProp>();
  readonly icon = input.required<IconDefinition>();
  readonly inverse = input(false);
  readonly pull = input<"left" | "right">();
  readonly rotate = input<FontAwesomeRotation>();
  readonly size = input<SizeProp>();
  readonly style = input<ClassOrStyle>();
  readonly swapOpacity = input(false);

  readonly classList = computed<ClassOrStyle>(() => {
    const animation = this.animation();
    const flip = this.flip();
    const pull = this.pull();
    const size = this.size();

    return {
      "svg-inline--fa": true,
      "fa-border": this.border(),
      "fa-fw": this.fixedWidth(),
      "fa-inverse": this.inverse(),
      "fa-swap-opacity": this.swapOpacity(),

      "fa-beat": animation === "beat",
      "fa-fade": animation === "fade",
      "fa-beat-fade": animation === "beat-fade",
      "fa-bounce": animation === "bounce",
      "fa-flip": animation === "flip",
      "fa-shake": animation === "shake",
      "fa-spin": animation === "spin",
      "fa-spin-pulse": animation === "spin-pulse",

      "fa-flip-horizontal": flip === "horizontal",
      "fa-flip-vertical": flip === "vertical",
      "fa-flip-both": flip === "both",

      "fa-pull-left": pull === "left",
      "fa-pull-right": pull === "right",

      "fa-rotate-by": this.rotate() !== undefined,

      "fa-2xs": size === "2xs",
      "fa-xs": size === "xs",
      "fa-sm": size === "sm",
      "fa-lg": size === "lg",
      "fa-xl": size === "xl",
      "fa-2xl": size === "2xl",
      "fa-1x": size === "1x",
      "fa-2x": size === "2x",
      "fa-3x": size === "3x",
      "fa-4x": size === "4x",
      "fa-5x": size === "5x",
      "fa-6x": size === "6x",
      "fa-7x": size === "7x",
      "fa-8x": size === "8x",
      "fa-9x": size === "9x",
      "fa-10x": size === "10x",

      ...this.class(),
    };
  });

  readonly parsedIcon = computed<Icon>(() => parseIcon(this.icon()));

  readonly styleList = computed(() => {
    const rotation = this.rotate();

    return {
      "--fa-rotate-angle": rotation ? `${rotation}deg` : undefined,
      ...this.style(),
    };
  });

  readonly viewBox = computed(() => {
    const parsed = this.parsedIcon();
    const [width, height] = parsed.icon;
    return `0 0 ${width} ${height}`;
  });
}
