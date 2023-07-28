class AuditsController < ApplicationController
    def show
        entity_name = params[:entity_name]
        record_id = params[:record_id]
    
        audits = Audit.where(entity_name: entity_name, record_id: record_id).order(created_at: :asc)
    
        render json: audits, status: :ok
      end
end
