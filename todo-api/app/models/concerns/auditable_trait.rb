module AuditableTrait
    extend ActiveSupport::Concern
  
    included do
      after_create :create_audit_record_on_create
      after_update :create_audit_record_on_update
      after_destroy :create_audit_record_on_destroy
    end
  
    private
  
    def create_audit_record_on_create
      with_transaction do
        create_audit_record('Create', changes: self.attributes)
      end
    end
  
    def create_audit_record_on_update
      with_transaction do
        changes = self.saved_changes.except('updated_at', 'created_at')
        create_audit_record('Update', changes: changes) if changes.any?
      end
    end
  
    def create_audit_record_on_destroy
      with_transaction do
        create_audit_record('Delete', changes: self.attributes)
      end
    end
  
    def create_audit_record(action, changes:)
      Audit.create(
        entity_name: self.class.name,
        record_id: self.id,
        action: action,
        updates: changes.to_json,
      )
    end
  
    def with_transaction(&block)
      self.class.transaction do
        yield block
      rescue StandardError => e
        raise ActiveRecord::Rollback, e.message
      end
    end
  end
  