import * as SQLite from 'expo-sqlite/legacy';

function databaseConection() {
  const database = SQLite.openDatabase("map.db");
  return database;
}

export const db = databaseConection();