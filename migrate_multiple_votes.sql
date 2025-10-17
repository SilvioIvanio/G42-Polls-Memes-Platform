-- Migration to add multiple votes feature
-- Run this in phpMyAdmin or MySQL command line

USE campus_pulse;

-- Add allow_multiple_votes column to polls table
ALTER TABLE polls ADD COLUMN allow_multiple_votes TINYINT(1) NOT NULL DEFAULT 0 AFTER question;

-- Drop the unique constraint on votes table to allow multiple votes
ALTER TABLE votes DROP INDEX unique_vote_per_user;

-- Done! Now polls can optionally allow multiple votes
