// src/CdCli/sys/cd-comm/controllers/cd-logger.controller.ts

import CdLog from '../../../sys/cd-comm/controllers/cd-logger.controller.js';
import { CdAiLogRouterService } from '../services/cd-ai-log-router.service.js';

CdLog.aiInfo = (msg: string) => {
  const line = `[${new Date().toISOString()}] ℹ️ ${msg}`;
  CdAiLogRouterService.push(line);
};

CdLog.aiDebug = (msg: string) => {
  const line = `[${new Date().toISOString()}] 🛠️ ${msg}`;
  CdAiLogRouterService.push(line);
};
