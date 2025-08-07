import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { useNotifications } from './useNotifications';

export interface HabitData {
  startDate: string | null;
  currentDay: number;
  completedDays: boolean[];
  lastCompletedDate: string | null;
  isCompleted: boolean;
}

export interface RewardSettings {
  daily: string;
  weekly: string;
  final: string;
}

const initialHabitData: HabitData = {
  startDate: null,
  currentDay: 0,
  completedDays: new Array(21).fill(false),
  lastCompletedDate: null,
  isCompleted: false,
};

const initialRewards: RewardSettings = {
  daily: '',
  weekly: '',
  final: '',
};

/**
 * Custom hook for managing 21-day habit tracking
 * Handles automatic reset if a day is missed
 */
export function useHabitTracker() {
  const { sendCongratulations } = useNotifications();
  const [habitData, setHabitData] = useLocalStorage<HabitData>('habitData', initialHabitData);
  const [rewards, setRewards] = useLocalStorage<RewardSettings>('rewards', initialRewards);
  const [showReward, setShowReward] = useState<'daily' | 'weekly' | 'final' | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const resetHabit = useCallback(() => {
    setHabitData(initialHabitData);
  }, [setHabitData]);

  // Check if habit should be reset due to missed day
  useEffect(() => {
    const checkForReset = () => {
      if (!habitData.startDate || !habitData.lastCompletedDate) return;

      const today = new Date().toDateString();
      const lastCompleted = new Date(habitData.lastCompletedDate).toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

      // If last completed date is not today or yesterday, reset the habit
      if (lastCompleted !== today && lastCompleted !== yesterday) {
        setShowResetModal(true);
        resetHabit();
      }
    };

    checkForReset();
  }, [habitData.lastCompletedDate, habitData.startDate, resetHabit]);

  const startHabit = () => {
    const today = new Date().toDateString();
    setHabitData({
      startDate: today,
      currentDay: 0,
      completedDays: new Array(21).fill(false),
      lastCompletedDate: null,
      isCompleted: false,
    });
  };

  const completeDay = () => {
    const today = new Date().toDateString();
    
    // Prevent completing the same day twice
    if (habitData.lastCompletedDate === today) return;

    const newCurrentDay = habitData.currentDay + 1;
    const newCompletedDays = [...habitData.completedDays];
    newCompletedDays[habitData.currentDay] = true;

    const newHabitData: HabitData = {
      ...habitData,
      currentDay: newCurrentDay,
      completedDays: newCompletedDays,
      lastCompletedDate: today,
      isCompleted: newCurrentDay >= 21,
    };

    setHabitData(newHabitData);

    // Send congratulations notification
    sendCongratulations(newCurrentDay);

    // Show appropriate reward
    if (newCurrentDay === 21) {
      setShowReward('final');
    } else if (newCurrentDay % 7 === 0) {
      setShowReward('weekly');
    } else {
      setShowReward('daily');
    }
  };

  const canCompleteToday = () => {
    const today = new Date().toDateString();
    return habitData.lastCompletedDate !== today && !habitData.isCompleted;
  };

  const getDaysRemaining = () => {
    return Math.max(0, 21 - habitData.currentDay);
  };

  const getMotivationalMessage = () => {
    if (habitData.currentDay === 0) return 'start';
    if (habitData.currentDay <= 7) return 'week1';
    if (habitData.currentDay <= 14) return 'week2';
    if (habitData.currentDay < 21) return 'week3';
    return 'completed';
  };

  const updateRewards = (newRewards: RewardSettings) => {
    setRewards(newRewards);
  };

  const exportData = () => {
    const data = {
      habitData,
      rewards,
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.habitData) setHabitData(data.habitData);
      if (data.rewards) setRewards(data.rewards);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  return {
    habitData,
    rewards,
    showReward,
    showResetModal,
    startHabit,
    completeDay,
    resetHabit,
    canCompleteToday,
    getDaysRemaining,
    getMotivationalMessage,
    updateRewards,
    exportData,
    importData,
    setShowReward,
    setShowResetModal,
  };
}