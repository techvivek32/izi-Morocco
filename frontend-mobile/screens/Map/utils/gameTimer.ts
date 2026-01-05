import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

/**
 * Converts game time format for display.
 * (Unchanged logic from original code)
 */
export const ConvertGameTime = (type: any, zoneTime: any, duration: any) => {
  switch (type) {
    case 'no_time_limit':
      return 'No time limit';

    case 'duration': {
      if (!duration || !duration.value) return 'N/A';
      const { unit, value } = duration;

      if (unit === 'minutes') {
        if (value >= 60) {
          const hours = Math.floor(value / 60);
          const minutes = value % 60;
          return minutes > 0 ? `${hours} hr ${minutes} min` : `${hours} hr`;
        }
        return `${value} min`;
      }

      if (unit === 'hours') return `${value} hr`;
      if (unit === 'seconds') return `${Math.floor(value / 60)} min`;

      return `${value} ${unit}`;
    }

    case 'end_time': {
      const endTime = new Date(zoneTime);
      const now = new Date();
      const diffMs = endTime.getTime() - now.getTime();
      if (diffMs <= 0) return 'Expired';

      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      return hours > 0
        ? `${hours} hr ${minutes} min left`
        : `${minutes} min left`;
    }

    default:
      return 'N/A';
  }
};

/**
 * Custom hook to handle countdown timer
 * Returns [timeLeft, formattedTime]
 */
export const useGameTimer = (game: any) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Initialize total seconds based on type
  useEffect(() => {
    if (game?.game?.timeLimit === 'duration' && game?.game?.duration) {
      const { unit, value } = game.game.duration;
      let totalSeconds = 0;
      if (unit === 'minutes') totalSeconds = value * 60;
      else if (unit === 'hours') totalSeconds = value * 3600;
      else if (unit === 'seconds') totalSeconds = value;
      setTimeLeft(totalSeconds);
    } else if (game?.game?.timeLimit === 'end_time' && game?.game?.endTime) {
      const endTime = new Date(game.game.endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(diff);
    } else {
      setTimeLeft(null);
    }
  }, [game]);

  // Countdown interval
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      Alert.alert('Time’s up!', 'Your game has ended.');
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev && prev > 0) return prev - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format mm:ss
  const formattedTime =
    timeLeft !== null
      ? `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(
          timeLeft % 60
        )
          .toString()
          .padStart(2, '0')}`
      : null;

  return [timeLeft, formattedTime] as const;
};
