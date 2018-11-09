import React from 'react'
import PropTypes from 'prop-types'
import { reverse } from 'lodash'
import './Shows.css'

const maxFont = 20
const expFont = (num, x) => Math.pow(num, x)

const Shows = ({ shows, upcoming }) => {
	const x = !upcoming ? Math.log(maxFont) / Math.log(shows.length) : 1
	const showsArray = upcoming ? reverse(shows) : shows
	let count = !upcoming ? shows.length : maxFont
	const showDisplay =
		shows.length >= 1 ? (
			showsArray.map(({ date, venue, location, otherActs, link }, index) => {
				index !== 0 && (count = count - 1)
				return (
					<ol key={index}>
						<li
							className="showListBox"
							style={{ fontSize: expFont(count + 1, x) }}
						>
							<ul>
								<li>
									<span className="showListItemRow">
										<strong>Date: </strong>
										{date}
									</span>
								</li>
								<li>
									<span className="showListItemRow">
										<strong>Location: </strong>
										{location}
									</span>
								</li>
								<li>
									<span className="showListItemRow">
										<strong>Venue: </strong>
										{venue}
									</span>
								</li>
								<li>
									<span className="showListItemRow">
										<strong>Other Acts: </strong>
										{otherActs}
									</span>
								</li>
								{link && (
									<li>
										<span className="showListItemRow showListLink">
											<a href={`${link}`}>{link}</a>
										</span>
									</li>
								)}
							</ul>
						</li>
						<br />
					</ol>
				)
			})
		) : (
			<span>
				<span role="img" aria-label="candle">
					🕯
				</span>
				{'  No upcoming shows  '}
				<span role="img" aria-label="candle">
					🕯
				</span>
				️
			</span>
		)
	return <div className="showList">{showDisplay}</div>
}

Shows.propTypes = {
	shows: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			venue: PropTypes.string.isRequired,
			location: PropTypes.string.isRequired,
			otherActs: PropTypes.string.isRequired
		})
	).isRequired,
	upcoming: PropTypes.bool.isRequired
}

export default Shows
