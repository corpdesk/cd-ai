// src/CdCli/sys/comm/controllers/cd-logger.controller.ts

import CdLog from '../../../sys/comm/controllers/cd-logger.controller';
import { CdAiLogRouterService } from '../services/cd-ai-log-router.service';

CdLog.aiInfo = (msg: string) => {
  const line = `[${new Date().toISOString()}] ℹ️ ${msg}`;
  CdAiLogRouterService.push(line);
};

CdLog.aiDebug = (msg: string) => {
  const line = `[${new Date().toISOString()}] 🛠️ ${msg}`;
  CdAiLogRouterService.push(line);
};
