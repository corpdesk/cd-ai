/**
     * curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "cd-ai-usage-logs-types",
        "c": "cd-ai-usage-logs-typeRef",
        "a": "Create",
        "dat": {
            "f_vals": [
            {
                "data": {
                "abcdRefName": "DemoRef:28:11:2024:11:55",
                "abcdRefDescription": "test create"
                }
            }
            ],
            "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": {}
        }' https://localhost:3001/api -v | jq '.'\
     * @param req
     * @param res
     */
    async Create(req, res) {
        try {
            await this.svcd-ai-usage-logs-typeType.create(req, res);
        } catch (e) {
            await this.b.serviceErr(req, res, e, 'cd-ai-usage-logs-typeTypeController:Create');
        }
    }
// /**
    //  * {
    //         "ctx": "Sys",
    //         "m": "Moduleman",
    //         "c": "cd-ai-usage-logs-typeType",
    //         "a": "Get",
    //         "dat": {
    //             "f_vals": [
    //                 {
    //                     "query": {
    //                         "where": {"companyId": 45763}
    //                     }
    //                 }
    //             ],
    //             "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
    //         },
    //         "args": null
    //     }
    //  * @param req
    //  * @param res
    //  */
    async Get(req, res) {
        try {
            await this.svcd-ai-usage-logs-typeType.getcd-ai-usage-logs-typeType(req, res);
        } catch (e) {
            await this.b.serviceErr(req, res, e, 'cd-ai-usage-logs-typeTypeController:Get');
        }
    }

      @Post()
      async GetType(req: Request, res: Response): Promise<void> {
        // TODO: implement - GetType operation for CdAiUsageLogs
      }
    
// async GetType(req, res) {
    //     try {
    //         await this.svcd-ai-usage-logs-typeType.getcd-ai-usage-logs-typeTypeTypeCount(req, res);
    //     } catch (e) {
    //         this.b.serviceErr(req, res, e, 'cd-ai-usage-logs-typeTypeController:Get');
    //     }
    // }

    /** Pageable request:
    curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "cd-ai-usage-logs-types",
        "c": "cd-ai-usage-logs-typeRef",
        "a": "GetCount",
        "dat": {
          "f_vals": [
            {
              "query": {
                "select": [
                  "abcdRefId",
                  "abcdRefName"
                ],
                "where": {}
              }
            }
          ],
          "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": null
      }' https://localhost:3001/api -v | jq '.'
    //  * @param req
    //  * @param res
    //  */
    async GetCount(req, res) {
        try {
            await this.svcd-ai-usage-logs-typeType.getcd-ai-usage-logs-typeTypeCount(req, res);
        } catch (e) {
            await this.b.serviceErr(req, res, e, 'cd-ai-usage-logs-typeTypeController:Get');
        }
    }
/**
    curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "cd-ai-usage-logs-types",
        "c": "cd-ai-usage-logs-typeRef",
        "a": "Update",
        "dat": {
          "f_vals": [
            {
              "query": {
                "update": {
                  "abcdRefDescription": "updated version"
                },
                "where": {
                  "abcdRefId": 114
                }
              }
            }
          ],
          "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": null
      }' https://localhost:3001/api -v | jq '.'
    //  * @param req
    //  * @param res
    //  */
    async Update(req, res) {
        console.log('cd-ai-usage-logs-typeTypeController::Update()/01');
        try {
            console.log('cd-ai-usage-logs-typeTypeController::Update()/02');
            await this.svcd-ai-usage-logs-typeType.update(req, res);
        } catch (e) {
            await this.b.serviceErr(req, res, e, 'cd-ai-usage-logs-typeTypeController:Update');
        }
    }
/**
    //  * curl -k -X POST -H 'Content-Type: application/json' -d '{
        "ctx": "App",
        "m": "cd-ai-usage-logs-types",
        "c": "cd-ai-usage-logs-typeRef",
        "a": "Delete",
        "dat": {
            "f_vals": [
            {
                "query": {
                "where": {
                    "abcdRefId": 114
                }
                }
            }
            ],
            "token": "08f45393-c10e-4edd-af2c-bae1746247a1"
        },
        "args": null
        }' https://localhost:3001/api -v | jq '.'
    //  * @param req
    //  * @param res
    //  */
    async Delete(req, res) {
        try {
            await this.svcd-ai-usage-logs-typeType.delete(req, res);
        } catch (e) {
            await this.b.serviceErr(req, res, e, 'cd-ai-usage-logs-typeTypeController:Update');
        }
    }

      @Post()
      async LogUsage(req: Request, res: Response): Promise<void> {
        // TODO: implement - Logs an AI request/response usage entry
      }
    

      @Post()
      async GetUsageSummary(req: Request, res: Response): Promise<void> {
        // TODO: implement - Returns summarized AI usage logs
      }
    