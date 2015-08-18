class ContactsController < ApplicationController

  def new
    @contact = Contact.new
  end

  def create
    @contact          = Contact.new(params[:contact])
    @contact.request  = request

    if (@contact.deliver)
      redirect_to (new_contact_path), flash: {success: "Message delivered."}
    else
      # flash.now[:notice] = "Unfortunately, the message could not be sent."
      render :new, flash: {failure: "Message could not be sent."}
    end
  end

end
