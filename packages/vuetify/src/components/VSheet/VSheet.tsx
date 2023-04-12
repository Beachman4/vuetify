// Styles
import './VSheet.sass'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'
import { toRef } from 'vue'

export const makeVSheetProps = propsFactory({
  color: String,

  ...makeComponentProps(),
  ...makeBorderProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'v-sheet')

export const VSheet = genericComponent()({
  name: 'VSheet',

  props: {
    ...makeVSheetProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <props.tag
        class={[
          'v-sheet',
          props.class,
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          positionClasses.value,
          roundedClasses.value,
        ]}
        style={[
          props.style,
          backgroundColorStyles.value,
          dimensionStyles.value,
          locationStyles.value,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VSheet = InstanceType<typeof VSheet>
