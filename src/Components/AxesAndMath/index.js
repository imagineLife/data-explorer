import React from 'react'
import Axis from '../Axis'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions
  const {t,r,b,l} = margins;

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height- b})`,
    tickSize: height - b,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${0}, 0)`,
    tickSize: width - r,
  }

  return (
    <g className="axes">
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}
