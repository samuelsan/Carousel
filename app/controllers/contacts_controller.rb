class ContactsController < ApplicationController

  def new
    @contact = Contact.new
  end

  def create
    @contact          = Contact.new(params[:contact])
    @contact.request  = request

    if (@contact.deliver)
      flash.now[:notice] = "Thank you for your message. We will be in touch soon."
    else
      flash.now[:notice] = "Unfortunately, the message could not be sent."
      render :new
    end
  end

end
