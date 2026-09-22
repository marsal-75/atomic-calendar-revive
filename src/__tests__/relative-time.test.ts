import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { describe, expect, test } from 'vitest';

import { getRelativeTimeText } from '../lib/common.html';

dayjs.extend(relativeTime);

const NOW = dayjs('2026-04-25T12:00:00');

describe('getRelativeTimeText', () => {
	test('keeps hour precision for an event crossing midnight within 24 hours', () => {
		expect(getRelativeTimeText(dayjs('2026-04-26T00:15:00'), NOW)).toBe('in 12 hours');
	});

	test('uses day-level wording for events more than 24 hours away', () => {
		expect(getRelativeTimeText(dayjs('2026-04-26T23:00:00'), NOW)).toBe('in a day');
	});

	test('does not render relative text for current or past events', () => {
		expect(getRelativeTimeText(dayjs('2026-04-25T11:59:00'), NOW)).toBe('');
	});
});
